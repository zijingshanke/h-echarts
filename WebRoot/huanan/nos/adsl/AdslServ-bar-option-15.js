

function optionTrackBar15(){
	
	var option = {
			title:{
				text:'ר���Զ�ʩ���ɹ���'
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    grid:{
		    	x:30,
		    	y:45,
		    	x2:10,
		    	y2:5,
		    	width:650,
		    	height:200
		    },
		    calculable : true,
		    legend: {
		        data:['��װ','ͣ��','����','���˵�']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['0326','0327','0328','0329','0330','0331','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : 'ר��',
		            axisLabel : {
		                formatter: '{value} ��'
		            }
		        },
		        {
		            type : 'value',
		            name : '���˵�',
		            axisLabel : {
		                formatter: '{value} ��'
		            }
		        }
		    ],
		    series : [

		        {
		            name:'��װ',
		            type:'bar',
		            data:[0,0,0,0,20,12,19,10,16,0,0,0,13,7,7,2]
		        },
		        {
		            name:'ͣ��',
		            type:'bar',
		            data:[3,6,0,4,19,8,4,4,2,3,2,5,1,4,9,0]
		        },
		        {
		            name:'����',
		            type:'bar',
		            data:[6,7,1,3,14,12,6,2,3,1,1,0,8,2,8,0]
		        },
		        {
		            name:'���˵�',
		            type:'line',
		            yAxisIndex: 1,
		            data:[0,1,0,0,1,4,1,5,4,0,0,1,3,0,2,1]
		        }
		    ]
		};
		                    
	return option;
}

