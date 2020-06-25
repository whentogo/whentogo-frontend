import { post } from './http';

export async function postFeedback(
  title: string,
  description: string,
): Promise<any> {
  return post(`feedbacks`, { title, description });
}

export async function getFeedbackById() {
  return null;
}
