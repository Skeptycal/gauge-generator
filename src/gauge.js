import React, {Component} from "react";

const TICK_ID = "tick";

class Gauge extends Component {

    renderDial = (opts) => {
        return (
            <circle
                cx={opts.cX}
                cy={opts.cY}
                r={opts.radius}
                fill="none"
                stroke={opts.dialColor}
                strokeWidth={opts.dialWidth}
            >
            </circle>
        )
    };

    defineTick = (opts) => {
        let tX1 = opts.cX + opts.radius - (Math.max(opts.dialWidth, opts.progressWidth) / 2);
        let tX2 = tX1 - opts.tickLength;

        return (<line
            id={TICK_ID}
            x1={tX1}
            y1={opts.cY}
            x2={tX2}
            y2={opts.cY}
            stroke={opts.tickColor}
            strokeWidth={opts.tickWidth}
        />);
    };

    renderTicks = (opts) => {
        let tickAngles = [];
        for (let i = 0; i <= 360; i += opts.tickInterval) {
            tickAngles.push(i);
        }
        return (
            <g className="ticks">
                {
                    tickAngles.map((tickAngle, idx) => {
                        return <use
                            href={`#${TICK_ID}`}
                            key={`tick-${idx}`}
                            transform={`rotate(${tickAngle} ${opts.cX} ${opts.cY})`}
                        />
                    })
                }
            </g>
        )
    };

    renderProgress = (opts) => {

        let offset = (opts.circumference * (1 - (opts.currentValue / 100)));

        return (
            <circle
                cx={opts.cX}
                cy={opts.cY}
                r={opts.radius}
                fill="none"
                stroke={opts.upProgressColor}
                strokeWidth={opts.progressWidth}
                strokeDasharray={opts.circumference}
                strokeDashoffset={offset}
            />
        )
    };

    render() {

        let opts = Object.assign({}, this.props);

        let {
            size,
            dialWidth,
        } = opts;

        let cX = size / 2;
        let cY = size / 2;
        let radius = (size - (2 * dialWidth)) / 2;
        let diameter = 2 * radius;
        let circumference = 2 * Math.PI * radius;
        opts = Object.assign(opts, {
            cX,
            cY,
            radius,
            diameter,
            circumference
        });

        return (
            <svg
                height={size}
                width={size}
                viewBox={`0 0 ${size} ${size}`}
                transform="rotate(-90)"
            >
                <defs>
                    {this.defineTick(opts)}
                </defs>
                {this.renderDial(opts)}
                {this.renderTicks(opts)}
                {this.renderProgress(opts)}
            </svg>
        )
    }
}

Gauge.defaultProps = {
    size: 200,

    dialWidth: 10,
    dialColor: "#eee",

    tickLength: 3,
    tickWidth: 1,
    tickColor: "#cacaca",
    tickInterval: 10,

    maximumValue: 100,
    currentValue: 60,
    progressWidth: 5,
    upProgressColor: "#cacaca",
    downProgressColor: "red"
};

export default Gauge;