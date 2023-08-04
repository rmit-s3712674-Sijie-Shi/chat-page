export interface IForm {
    id?: string;
    formId?: string;
    title: string;
    questions: IQuestion[]| null;
    timestamp: number | undefined;
    endtime?: number | undefined;
}
export type QuestionType = "rate" | "text";

export interface IQuestion {
    id: string;
    description: string;
    questionsType: QuestionType;
    response: string;
    maxRate: number;
    minRate: number;
}


let arr = ["1", "2", "3"] as const;

type roles = typeof arr

type rolearr = roles[num]
