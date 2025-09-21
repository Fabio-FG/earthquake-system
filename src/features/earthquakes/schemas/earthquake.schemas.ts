import { z } from "zod";

const earthquakeSearchSchema = z.object({
  starttime: z.string().optional(),
  endtime: z.string().optional(),
  minmagnitude: z.coerce.number().optional(),
  maxmagnitude: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  orderby: z
    .enum(["time", "time-asc", "magnitude", "magnitude-asc"])
    .optional(),
});

export type earthquakeSearchSchema = z.infer<typeof earthquakeSearchSchema>;
