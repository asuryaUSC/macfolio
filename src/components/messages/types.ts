export interface FAQItem {
  question: string;
  answer: string;
}

export interface ConversationEntry {
  content: string;
  isUser: boolean;
  delivered?: boolean;
  reaction?: string;
}
