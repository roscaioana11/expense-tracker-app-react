const polarAreaChartService = {
    dataPolarAreaChart: function (chartDataAndLabelsArray) {
        const chartData = [];
        const chartLabels = [];

        chartDataAndLabelsArray.forEach(chartObj => {
            chartData.push(chartObj.data);
            chartLabels.push(chartObj.label)
        });

        return {
            labels: chartLabels,
            datasets:
                [
                    {
                        label: '# of Expenses',
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                        ],
                        borderWidth: 1,
                    },
                ],
        };
    },

    // convertPolarDataToPercentages: function () {
    //     return {
    //         plugins: {
    //             datalabels: {
    //                 formatter: (value, ctx) => {
    //
    //                     let sum = 0;
    //                     let dataArr = ctx.chart.data.datasets[0].data;
    //                     dataArr.map(data => {
    //                         sum += data;
    //                     });
    //                     let percentage = (value*100 / sum).toFixed(2)+"%";
    //                     return percentage;
    //                 },
    //                 color: '#fff',
    //             }
    //         }
    //     };
    // },

    convertExpensesToPolarData: function (expenseList, startDate, endDate) {
        const convertedPolarList = [];

        console.log(startDate);
        console.log(endDate);

        // food, transport, food
        expenseList.forEach(expense => { // food

            if (!startDate || !endDate || (new Date(expense.dateAdded).getTime() >= startDate.getTime() && new Date(expense.dateAdded).getTime() <= endDate.getTime())) {

                let existingCategory = undefined; // { }

                // 0: food, 1: transport, 2:
                convertedPolarList.forEach(polarData => {
                    if (polarData.label === expense.categoryName) {
                        existingCategory = polarData;
                    }
                });

                if (existingCategory) {
                    // in object cases - this case will have the reference of polarData
                    // and if existingCategory will be changed, then polarData will be changed too
                    existingCategory.data += expense.amount;
                } else {
                    const objPolar = {};
                    objPolar.label = expense.categoryName;
                    objPolar.data = expense.amount;
                    convertedPolarList.push(objPolar);
                }
                // const objPolar = { };
                // if (convertedPolarList.length === 0) {
                //     objPolar.label = expense.categoryName;
                //     objPolar.data = 0;
                //     convertedPolarList.push(objPolar);
                // }
                // convertedPolarList.forEach(polarData => {
                //     if (polarData.label !== expense.categoryName) {
                //         objPolar.label = expense.categoryName;
                //         objPolar.data = expense.amount;
                //         convertedPolarList.push(objPolar);
                //     } else {
                //         polarData.data += expense.amount;
                //     }
                // });
            }
        });

        return convertedPolarList;
    }
}

export default polarAreaChartService;
