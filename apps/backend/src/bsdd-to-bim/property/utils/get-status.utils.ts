export const getStatus = (status: string): string => {
	if (status === "Active" || "Released") return "active";
	return "inActive";
};

// possible status "Preview", "Active", "InActive", "Released
