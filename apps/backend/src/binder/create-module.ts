import type { Resolver } from "@generated/resolvers-types.js";
import type { IRules } from "graphql-shield";

export type ResolverMap = {
	[key: string]: Resolver<any, any, any, any>;
};

export type GraphQlModule<R extends ResolverMap> = {
	resolver: R[keyof R];
	shield: IRules;
};

export function createModule<R extends ResolverMap>(module: GraphQlModule<R>) {
	return module;
}

export type ModuleMap<R extends ResolverMap> = {
	[K in keyof R]: GraphQlModule<R>;
};

export function bindModules<R extends ResolverMap>(modules: ModuleMap<R>) {
	return {
		resolvers: buildQuery(modules),
		shield: buildShield(modules),
	};
}

const buildQuery = <R extends ResolverMap>(modules: ModuleMap<R>) => {
	return Object.keys(modules).reduce((acc, key) => {
		return {
			...acc,
			[key]: modules[key]!.resolver,
		};
	}, {});
};

const buildShield = <R extends ResolverMap>(modules: ModuleMap<R>) => {
	return Object.keys(modules).reduce((acc, key) => {
		return {
			...acc,
			[key]: modules[key]!.shield,
		};
	}, {});
};
