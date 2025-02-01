import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
    @Prop({required: true})
    fullUrl: string;
    @Prop({required: true})
    shortUrl: string;
    @Prop({default: 0})
    clicks: number;
}


export const UrlSchema = SchemaFactory.createForClass(Url);