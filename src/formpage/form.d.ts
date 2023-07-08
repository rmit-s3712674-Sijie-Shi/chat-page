export interface IForm {
    id: string;
    title: string;
    questions: IQuestion[]| null;
    timestamp: number | undefined;
    endtime: number | undefined;
}

export interface IQuestion {
    id: string;
    description: string;
    maxRate: number;
    minRate: number;
}