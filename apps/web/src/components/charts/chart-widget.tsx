import ReactECharts from 'echarts-for-react';

export default function ChartWidget(props: any) {
    const { title, ...options } = props;
    return (
        <ReactECharts
            option={{
                backgroundColor: 'transparent',
                // Grid padding/margin for line, bar, scatter charts (not gauge)
                grid: {
                    top: '10%',    // Top margin
                    left: '10%',   // Left margin  
                    right: '10%',  // Right margin
                    bottom: '10%', // Bottom margin
                    containLabel: true, // Include axis labels in the grid area
                    ...props.grid
                },
                series: props.series || [{
                    type: 'gauge',
                }],
                title: {
                    text: title || 'Default Title',
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    padding: [30, 10, 0, 10],
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%',
                },
                ...options,
            }}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
            {...props}
        />
    );
}
