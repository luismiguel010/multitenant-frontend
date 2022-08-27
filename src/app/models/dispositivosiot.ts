export class DispositivoIoT {
    deviceId: string;
    temperature: number;
    humidity: number;
    eventProcessedUtcTime: Date;

    constructor(deviceId: string, temperature: number, humidity: number, eventProcessedUtcTime: Date) {
        this.deviceId = deviceId;
        this.temperature = temperature;
        this.humidity = humidity;
        this.eventProcessedUtcTime = eventProcessedUtcTime;
    }
}