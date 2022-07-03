import React, {useLayoutEffect} from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import * as am5percent from "@amcharts/amcharts5/percent";

function PieChart({chartData}) {
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                alignLabels: false,
                calculateAggregates: false,
                valueField: "data",
                categoryField: "label",
            })
        );

        series.slices.template.setAll({
            strokeWidth: 3,
            stroke: am5.color(0xffffff),
        });

        series.labelsContainer.set("paddingTop", 30);

        // Set up adapters for variable slice radius
        // https://www.amcharts.com/docs/v5/concepts/settings/adapters/
        series.slices.template.adapters.add("radius", function (radius, target) {
            let dataItem = target.dataItem;
            let high = series.getPrivate("valueHigh");

            if (dataItem) {
                let value = target.dataItem.get("valueWorking", 0);
                return (radius * value) / high;
            }
            return radius;
        });

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(chartData);

        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
                marginTop: 15,
                marginBottom: 15,
            })
        );

        legend.data.setAll(series.dataItems);

        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [chartData]);

    return <div id="chartdiv" style={{width: "100%", height: "400px"}}></div>;
}

export default PieChart;
