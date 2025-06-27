export class CreateMessageDto {
    readonly content: string;
    readonly senderId: number;
    readonly recipientId: number;
}
