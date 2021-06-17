import React, { Component, ErrorInfo, ReactNode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

type ErrorBoundaryProps = WithTranslation & {
    children: ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
}

class ErrorBoundaryBeforeTranslation extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, t } = this.props;

    if (hasError) {
      // TODO: Сделать красиво вместе с версткой ошибок 404 и 5**
      return <h1>{t('something_is_wrong')}</h1>;
    }

    return children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryBeforeTranslation);
