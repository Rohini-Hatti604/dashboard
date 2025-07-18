import ChartWidget from "./chart-widget";

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'normal' | 'low' | 'all';



export default function GaugeChart({
    value,
    title,
    maxValue = 100,
    severity,
    center = ['50%', '80%'],  // Default center position
    radius = '95%',           // Default radius (smaller = more padding)
    padding = [0, 0, 0, 0]    // Custom padding [top, right, bottom, left]
}: {
    value: number;
    title: string;
    maxValue?: number;
    severity: SeverityLevel;
    center?: [string, string];
    radius?: string;
    padding?: [number, number, number, number];
}) {
    const getGaugeColor = (value: number) => {
        const chartValue = value / maxValue;
        const severityColors: Record<SeverityLevel, string> = {

            critical: '#b31312', // Red
            high: '#D2691E',     // Orange
            medium: '#daa520',
            normal: '#daa520',  // Yellow
            low: '#228B22',      // Green
            all: '#607d8b'      // Gray
        };
        const color = severityColors[severity] ?? '#607d8b'; // Default to gray if severity is not found
        return [chartValue, color];
    };

    const gaugeOption = {
        backgroundColor: '#161616',
        grid: {
            top: padding[0],
            right: padding[1],
            bottom: padding[2],
            left: padding[3]
        },
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: center,
                radius: radius,
                min: 0,
                max: maxValue,
                data: [{ value, name: '' }],
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        color: [getGaugeColor(value), [1, '#2A2A2A']],
                        width: 15
                    }
                },
                pointer: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                detail: {
                    color: '#FFFFFF',
                    fontSize: 32,
                    fontWeight: 'bold',
                    offsetCenter: [0, '-10%'],
                    formatter: '{value}'
                },
                title: {
                    show: false
                }
            }
        ]
    };

    return (
        <ChartWidget {...gaugeOption} title={title} />

    );
}