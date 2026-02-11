export interface ChartProps{
    xAxis:string[];
    yAxis:number[];
    data:Record<string, any>[];
    title:string;
    hexColor:string;
    type:'line' | 'bar' | 'area';
    xLegend:string[];
    yLegend:string[];
}

export const mockChartData:ChartProps[] = [
    {
        xAxis:["Jan","Feb","Mar","Apr","May","Jun"],
        yAxis:[10,20,30,40,50,60],
        data:[
            {name:"Jan",value:10},
            {name:"Feb",value:20},
            {name:"Mar",value:30},
            {name:"Apr",value:40},
            {name:"May",value:50},
            {name:"Jun",value:60}
        ],
        title:"Line Chart",
        hexColor:"rgba(39, 173, 155, 0.93)",
        type:'line',
        xLegend:['Month','Year'],
        yLegend:['Value','Amount']
    },
    {
        xAxis:["Jan","Feb","Mar","Apr","May","Jun"],
        yAxis:[80,40,30,60,20,60],
        data:[
            {name:"Jan",value:10},
            {name:"Feb",value:20},
            {name:"Mar",value:30},
            {name:"Apr",value:40},
            {name:"May",value:50},
            {name:"Jun",value:60}
        ],
        title:"Bar Chart",
        hexColor:"#a61f1fff",
        type:'bar',
        xLegend:['Month','Year'],
        yLegend:['Value','Amount']
    },
    {
        xAxis:["Jan","Feb","Mar","Apr","May","Jun"],
        yAxis:[50,10,20,40,80,60],
        data:[
            {name:"Jan",value:10},
            {name:"Feb",value:20},
            {name:"Mar",value:30},
            {name:"Apr",value:40},
            {name:"May",value:50},
            {name:"Jun",value:60}
        ],
        title:"Area Chart",
        hexColor:"#2916a1ff",
        type:'area',
        xLegend:['Month','Year'],
        yLegend:['Value','Amount']
    }
]