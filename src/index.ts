import fs from "fs";
import { parse } from "csv-parse/sync";

const data = fs.readFileSync("FEH_00200521_220610143730.csv", {
	encoding: "utf8",
});

const records = parse(data);

let prefecturesAllPopulation: number[] = [];

let allPopulation: number = 0;

let averagePopulation: number = 0;

let medianPopulation: number = 0;

let distributed: number = 0;

let standardDeviation: number = 0;

for (let record of records) {
	const name = record[1];
	const population = Number(record[2].replace(/,/g, ""));
	const conditions =
		name[name.length - 1] === "都" ||
		name[name.length - 1] === "道" ||
		name[name.length - 1] === "府" ||
		name[name.length - 1] === "県";
	if (conditions) {
		prefecturesAllPopulation.push(population);
	}
}

const halfLength = (prefecturesAllPopulation.length / 2) | 0;
for (let population of prefecturesAllPopulation) {
	allPopulation += population;
}

prefecturesAllPopulation = prefecturesAllPopulation.sort((a, b) => a - b);

averagePopulation = allPopulation / prefecturesAllPopulation.length;

medianPopulation = prefecturesAllPopulation[halfLength];

for (let population of prefecturesAllPopulation) {
	distributed += Math.pow(population - averagePopulation, 2);
}

distributed = distributed / prefecturesAllPopulation.length;

standardDeviation = Math.sqrt(distributed);

console.log("平均値: " + averagePopulation);
console.log("中央値: " + medianPopulation);
console.log("最大値: " + Math.max.apply(null, prefecturesAllPopulation));
console.log("最小値: " + Math.min.apply(null, prefecturesAllPopulation));
console.log("分散: " + distributed);
console.log("標準偏差: " + standardDeviation);
