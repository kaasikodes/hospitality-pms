"use client";

import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { GetBranchesSchema } from "../_schemas";
import { getBranches } from "../_actions";
import { toast } from "sonner";
import { Branch } from "@prisma/client";

export const useGetBranches = () => {
  const [isLoading, startTransition] = useTransition();
  // ! how is the type generated by prisma?
  const [branches, setBranches] = useState<Branch[] | null>(null);

  /*
TODO: Consider implementing optimistic UI updates to improve the perceived performance of the app. Update the UI optimistically as soon as the user initiates an action and then revert the changes if the action fails. This approach can make the application feel more responsive.

TODO:
Dependency Injection: The hook is tightly coupled with the getBranches function. Consider making this function injectable so that you can easily mock it in unit tests or replace it with a different implementation if needed.
*/

  const handleGetBranches = (values?: z.infer<typeof GetBranchesSchema>) => {
    const handler = async () => {
      // code to execute during transition
      try {
        // await getBranches Promise to resolve
        const payload = await getBranches(values);

        if (payload && payload.data?.result.length) {
          // update branches state
          setBranches(payload.data?.result);
          // show a success toast
          toast.success(payload.message, {
            cancel: {
              label: "Dismiss",
            },
          });
        } else {
          // TODO: use a more specific error message to help user
          toast.error(payload?.message, {
            description: "OOPS! Something went wrong",
            cancel: {
              label: "Dismiss",
            },
          });
        }
      } catch (error) {
        // TODO: use a more specific error message to help user
        // use toast to handle error
        toast.error("Error", {
          description: "OOPS! Something went wrong",
          cancel: {
            label: "Dismiss",
          },
          className: "bg-slate-400",
        });
      }
    };

    startTransition(() => {
      handler();
    });
  };

  useEffect(() => {
    handleGetBranches();
  }, []);

  return { isLoading, branches };
};
