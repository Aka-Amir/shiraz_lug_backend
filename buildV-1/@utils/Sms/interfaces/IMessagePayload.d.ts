export interface IMessagePayload {
    op: 'send' | 'pattern';
    user: string;
    pass: string;
}
