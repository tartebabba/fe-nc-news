import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function PageNotFound() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Page not found</AlertTitle>
      <AlertDescription>
        Uh oh! We we're able to find that page.
      </AlertDescription>
    </Alert>
  );
}

export function ErrorPage(props) {
  const { error } = props;
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.errorMessage}</AlertDescription>
    </Alert>
  );
}
