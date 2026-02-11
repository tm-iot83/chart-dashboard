export interface ChartProps{
    xAxis:string[];
    yAxis:number[];
    data:Record<string, any>[];
    title:string;
    hexColor:string;
    type:'line' | 'bar' | 'area';
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
        hexColor:"#a61f1fff",
        type:'line'
    },
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
        title:"Bar Chart",
        hexColor:"#a61f1fff",
        type:'bar'
    },
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
        title:"Area Chart",
        hexColor:"#2916a1ff",
        type:'area'
    }
]