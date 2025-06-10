import { Button, Link, Skeleton } from '@heroui/react';
import React from 'react';
import {
  FiArrowRight,
  FiExternalLink,
  FiPackage,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';

import OrderSummaryCard from '@/libs/orders/components/summary-card';
import { OrderSummary } from '@/libs/orders/types';

interface EmptyStateConfig {
  message: string;
  actionText?: string;
  actionHref?: string;
  showAction?: boolean;
  actionType?: 'button' | 'link' | 'external';
  actionVariant?: 'primary' | 'secondary' | 'ghost';
  actionIcon?: React.ReactNode;
  actionClassName?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

interface ErrorStateConfig {
  title?: string;
  message: string;
  actionText?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  icon?: React.ReactNode;
}

interface RouteConfig {
  market?: string;
  orders?: string;
  stores?: string;
}

interface OrderListSectionProps {
  orders?: OrderSummary[];
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  emptyState?: EmptyStateConfig;
  routes?: RouteConfig;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  errorState?: ErrorStateConfig;
  onRetry?: () => void;
  skeletonCount?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: 'region' | 'main' | 'complementary' | 'navigation';
}

const DEFAULT_ROUTES = {
  market: '/market',
  orders: '/orders',
  stores: '/stores',
} as const;

const DEFAULT_EMPTY_STATES = {
  general: {
    message: 'No orders found',
    description: 'When you place orders, they will appear here.',
    actionText: 'Browse products',
    actionHref: '/market',
    showAction: true,
    actionType: 'link' as const,
    actionVariant: 'primary' as const,
    icon: <FiPackage size={48} className="text-hint/50" />,
  },
  recent: {
    message: 'No recent orders',
    description: 'Your recent order activity will be shown here.',
    showAction: false,
    icon: <FiPackage size={48} className="text-hint/50" />,
  },
  pending: {
    message: 'No pending orders',
    description: 'Orders awaiting processing will appear here.',
    showAction: false,
    icon: <FiPackage size={48} className="text-hint/50" />,
  },
  completed: {
    message: 'No completed orders yet',
    description: "Once your orders are fulfilled, you'll see them here.",
    actionText: 'Start shopping',
    actionHref: '/market',
    showAction: true,
    actionType: 'link' as const,
    actionVariant: 'primary' as const,
    icon: <FiPackage size={48} className="text-hint/50" />,
  },
  firstTime: {
    title: 'Welcome to your orders!',
    message: "You haven't placed any orders yet.",
    description: 'Start exploring our marketplace to find products you love.',
    actionText: 'Create your first order',
    actionHref: '/market',
    showAction: true,
    actionType: 'button' as const,
    actionVariant: 'primary' as const,
    icon: <FiPackage size={48} className="text-primary/30" />,
  },
} as const;

const DEFAULT_ERROR_STATE: ErrorStateConfig = {
  title: 'Unable to load orders',
  message: 'Something went wrong while fetching your orders. Please try again.',
  actionText: 'Try again',
  showRetry: true,
  icon: <FiAlertCircle size={48} className="text-danger" />,
};

export default function OrderListSection({
  orders,
  title,
  headingLevel = 2,
  className = '',
  emptyState = DEFAULT_EMPTY_STATES.general,
  routes = DEFAULT_ROUTES,
  isLoading = false,
  isError = false,
  error = null,
  errorState = DEFAULT_ERROR_STATE,
  onRetry,
  skeletonCount = 3,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'region',
}: OrderListSectionProps) {
  const HeadingTag = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;

  // Generate accessible section attributes
  const getSectionProps = () => {
    const props: React.HTMLAttributes<HTMLElement> = {
      className: `space-y-4 ${className}`,
      role,
    };

    if (ariaLabel) {
      props['aria-label'] = ariaLabel;
    } else if (ariaLabelledBy) {
      props['aria-labelledby'] = ariaLabelledBy;
    } else {
      const headingId = `order-section-${title.toLowerCase().replace(/\s+/g, '-')}`;
      props['aria-labelledby'] = headingId;
    }

    if (ariaDescribedBy) {
      props['aria-describedby'] = ariaDescribedBy;
    }

    if (isLoading) {
      props['aria-busy'] = true;
      props['aria-live'] = 'polite';
    }

    return props;
  };

  const getHeadingId = () => {
    if (ariaLabelledBy) return undefined;
    return `order-section-${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const getActionHref = (href: string) => {
    if (href.startsWith('/market')) {
      return routes.market || DEFAULT_ROUTES.market;
    }
    if (href.startsWith('/orders')) {
      return routes.orders || DEFAULT_ROUTES.orders;
    }
    if (href.startsWith('/stores')) {
      return routes.stores || DEFAULT_ROUTES.stores;
    }
    return href;
  };

  const renderEmptyStateAction = () => {
    if (!emptyState.showAction || !emptyState.actionText || !emptyState.actionHref) {
      return null;
    }

    const {
      actionText,
      actionHref,
      actionType = 'link',
      actionVariant = 'primary',
      actionIcon,
      actionClassName = '',
      onActionClick,
    } = emptyState;

    const href = getActionHref(actionHref);
    const handleClick = () => {
      onActionClick?.();
    };

    const getIcon = () => {
      if (actionIcon) return actionIcon;
      if (actionType === 'external') return <FiExternalLink size={16} aria-hidden="true" />;
      return <FiArrowRight size={16} aria-hidden="true" />;
    };

    if (actionType === 'external') {
      return (
        <Link
          href={href}
          isExternal
          className={`inline-flex items-center gap-2 text-primary transition-colors hover:text-primary-600 ${actionClassName}`}
          aria-label={`${actionText} (opens in new tab)`}
          onClick={handleClick}
        >
          {actionText}
          {getIcon()}
        </Link>
      );
    }

    if (actionType === 'link') {
      return (
        <Link
          href={href}
          className={`inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-600 ${actionClassName}`}
          aria-label={`Navigate to ${actionText}`}
          onClick={handleClick}
        >
          {actionText}
          {getIcon()}
        </Link>
      );
    }

    return (
      <Button
        as="a"
        href={href}
        variant={actionVariant === 'primary' ? 'solid' : 'flat'}
        color={actionVariant === 'primary' ? 'primary' : 'default'}
        className={`inline-flex items-center gap-2 ${actionClassName}`}
        aria-label={`Navigate to ${actionText}`}
        onClick={handleClick}
      >
        {actionText}
        {getIcon()}
      </Button>
    );
  };

  const renderEmptyState = () => (
    <div
      className="flex flex-col items-center justify-center space-y-6 px-6 py-12 text-center"
      role="status"
      aria-label="No orders available"
    >
      {emptyState.icon && (
        <div className="flex items-center justify-center" aria-hidden="true">
          {emptyState.icon}
        </div>
      )}

      <div className="max-w-md space-y-3">
        {emptyState.title && (
          <h3 className="text-lg font-semibold text-foreground">{emptyState.title}</h3>
        )}

        <p className="text-foreground/80 text-base font-medium">{emptyState.message}</p>

        {emptyState.description && (
          <p className="text-sm leading-relaxed text-hint">{emptyState.description}</p>
        )}
      </div>

      {renderEmptyStateAction()}
    </div>
  );

  const renderErrorState = () => (
    <div
      className="flex flex-col items-center justify-center space-y-6 px-6 py-12 text-center"
      role="alert"
      aria-label="Error loading orders"
    >
      {errorState.icon && (
        <div className="flex items-center justify-center" aria-hidden="true">
          {errorState.icon}
        </div>
      )}

      <div className="max-w-md space-y-3">
        {errorState.title && (
          <h3 className="text-lg font-semibold text-foreground">{errorState.title}</h3>
        )}

        <p className="text-foreground/80 text-base font-medium">{errorState.message}</p>

        {error?.message && (
          <p className="text-sm leading-relaxed text-hint">Technical details: {error.message}</p>
        )}
      </div>

      {errorState.showRetry && (
        <Button
          variant="flat"
          color="primary"
          onClick={onRetry || errorState.onRetry}
          className="inline-flex items-center gap-2"
          isDisabled={!onRetry && !errorState.onRetry}
          aria-label="Retry loading orders"
        >
          <FiRefreshCw size={16} aria-hidden="true" />
          {errorState.actionText}
        </Button>
      )}
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="space-y-4" role="status" aria-label="Loading orders" aria-live="polite">
      <span className="sr-only">Loading your orders, please wait...</span>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border border-divider p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
            <Skeleton className="h-6 w-16 rounded" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-divider pt-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    if (isError) {
      return renderErrorState();
    }

    if (!orders || orders.length === 0) {
      return renderEmptyState();
    }

    return (
      <div role="list" aria-label={`${orders.length} orders`}>
        {orders.map((order) => (
          <div key={`${order.id} ${order.createdAt}`} role="listitem">
            <OrderSummaryCard order={order} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section {...getSectionProps()}>
      <HeadingTag id={getHeadingId()} className="text-xl font-semibold text-foreground">
        {title}
      </HeadingTag>
      <div className="space-y-4">{renderContent()}</div>
    </section>
  );
}

export function createEmptyState(type: keyof typeof DEFAULT_EMPTY_STATES): EmptyStateConfig {
  return DEFAULT_EMPTY_STATES[type];
}

export function createErrorState(config: Partial<ErrorStateConfig>): ErrorStateConfig {
  return {
    ...DEFAULT_ERROR_STATE,
    ...config,
  };
}

export { OrderListSection as SummaryOrdersSection };

export { type EmptyStateConfig, type ErrorStateConfig };
