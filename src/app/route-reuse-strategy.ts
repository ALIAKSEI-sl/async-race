import {
	RouteReuseStrategy,
	ActivatedRouteSnapshot,
	DetachedRouteHandle,
	Route
} from '@angular/router';

export class RaceRouteReuseStrategy implements RouteReuseStrategy {
	private handlers: Map<Route, DetachedRouteHandle> = new Map();

	public shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return route.data['shouldReuse'] ?? false;
	}

	public store(
		route: ActivatedRouteSnapshot,
		handle: DetachedRouteHandle
	): void {
		if (route.routeConfig) {
			this.handlers.set(route.routeConfig, handle);
		}
	}

	public shouldAttach(route: ActivatedRouteSnapshot): boolean {
		const isRouteHandle = route.routeConfig
			? Boolean(this.handlers.get(route.routeConfig))
			: false;

		return Boolean(route.routeConfig) && isRouteHandle;
	}

	public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		if (!route.routeConfig || !this.handlers.has(route.routeConfig)) {
			return null;
		}

		return this.handlers.get(route.routeConfig) as DetachedRouteHandle;
	}

	public shouldReuseRoute(
		future: ActivatedRouteSnapshot,
		curr: ActivatedRouteSnapshot
	): boolean {
		return future.routeConfig === curr.routeConfig;
	}
}
