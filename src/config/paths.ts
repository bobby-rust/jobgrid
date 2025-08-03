export const paths = {
  home: {
    getHref: () => '/',
    new: {
      getHref: () => "/new"
    }
  },

  auth: {
    register: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },

    app: {
        root: {
            getHref: () => "/"
        }
    }
  },
} as const;