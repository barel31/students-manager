import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ClipboardCheck } from 'lucide-react';
import { Card } from './ui/card';

export default function EmptyAssignments() {
  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardCheck className="h-10 w-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Assignments Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any assignments yet. Get started by
            creating first assignment.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  );
}
