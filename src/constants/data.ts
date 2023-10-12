// Create a file for data generation, e.g., DataGenerator.ts

// Simulated data generator
export class DataGenerator {
    private static instance: DataGenerator;
    private interval: NodeJS.Timeout;

    private constructor() {
        this.interval = setInterval(this.generateData, 5000); // 5-second interval
    }

    private generateData() {
        const speed = Math.random() * 120; // Random speed between 0 and 120 km/h
        const rpm = Math.random() * 7000; // Random RPM between 0 and 7000
        const fuelLevel = Math.random() * 100; // Random fuel level between 0 and 100%
        const engineTemp = Math.random() * 100; // Random engine temperature between 0 and 100°C
        const latitude = 6.5391 /* Generate random latitude */;
        const longitude = 3.3849/* Generate random longitude */;
        return { speed, rpm, fuelLevel, engineTemp, latitude, longitude }
    }

    // Singleton instance
    public static getInstance(): DataGenerator {
        if (!this.instance) {
            this.instance = new DataGenerator();
        }
        return this.instance;
    }
}
