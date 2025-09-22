/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import type { $ZodTypeInternals } from "zod/v4/core";

export type Properties<T> = Required<{
	[K in keyof T]: z.ZodType<T[K], any, $ZodTypeInternals<T[K], any>>;
}>;

export type FormSchema<T> = z.ZodObject<Properties<T>>;
