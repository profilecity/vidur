export type InputReceivable = {
  inputProvided: () => void;
};

export type SelectableOption = { id: string | number; title: string; logo?: string };

export type Tab = {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export type Step = {
  step: number;
  title?: string;
  description?: string;
  icon: string;
}