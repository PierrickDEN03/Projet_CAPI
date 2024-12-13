export function createRouter(routeView) {
    switch (routeView) {
        case 'home':
            routeView = '/home'
            break
    }
    window.location.href = routeView
}
