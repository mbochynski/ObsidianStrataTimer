export const defaultSettings: SimpleTimeTrackerSettings = {
    timestampFormat: "YY-MM-DD HH:mm",
    editableTimestampFormat: "YYYY-MM-DD HH:mm",
    csvDelimiter: ",",
    fineGrainedDurations: true,
    reverseSegmentOrder: false,
    timestampDurations: false,
    showToday: false,
    useMonospacedFont: false,
    defaultTimeOnly: true,
    maxDepth: 2
};

export interface SimpleTimeTrackerSettings {

    timestampFormat: string;
    editableTimestampFormat: string;
    csvDelimiter: string;
    fineGrainedDurations: boolean;
    reverseSegmentOrder: boolean;
    timestampDurations: boolean;
    showToday: boolean;
    useMonospacedFont: boolean;
    defaultTimeOnly: boolean;
    maxDepth: number;
}
