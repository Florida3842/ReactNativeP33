import INbuRate from "../model/INbuRate";

export default class NbuRateApi {

    static getCurrentRates():Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    } 

    static getRatesByDate(date: Date): Promise<Array<INbuRate>> {
        const formatted = NbuRateApi.formatDate(date);

        return fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${formatted}&json`)
            .then(r => r.json());
    }

    private static formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${year}${month}${day}`; // YYYYMMDD
    }
};