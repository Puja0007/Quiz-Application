export interface Question {
  _id: string;
  title: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}
