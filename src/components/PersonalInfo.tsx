import { Card, CardContent } from '@/components/ui/card';

interface InfoItemProps {
  label: string;
  content: string;
}

function InfoItem({ label, content }: InfoItemProps) {
  return (
    <div className="mb-4 last:mb-0 opacity-0 intersect:opacity-100 transition-opacity duration-700">
      <h3 className="text-sm md:text-base font-medium text-muted-foreground mb-2">
        {label}
      </h3>
      <p className="text-base md:text-lg text-foreground leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export function PersonalInfo() {
  return (
    <Card className="soft-shadow border-border/50 glass-effect">
      <CardContent className="p-6 md:p-8 space-y-6">
        <InfoItem
          label="我现在主要在做"
          content="利用AI协作进行产品开发和英语辩论"
        />
        <InfoItem
          label="我的兴趣"
          content="写作、电影、辩论、哲学、音乐"
        />
        <InfoItem
          label="我一个比较有记忆点的特点"
          content="天马行空的丰富想象力及强大的感知力"
        />
        <InfoItem
          label="我的主要成就"
          content="2025中国大学生英语辩论赛一等奖及全国最佳辩手"
        />
      </CardContent>
    </Card>
  );
}
