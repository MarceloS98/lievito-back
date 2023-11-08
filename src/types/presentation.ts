export interface Presentation {
  presentation_id: number;
  name: string;
  size_gr: number;
}

export interface PresentationPayload {
  name?: string;
  size_gr?: number;
}
