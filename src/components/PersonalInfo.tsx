import React, { useState } from 'react';

interface Section {
  title: string;
  items: {
    label: string;
    content: string;
  }[];
}

export function PersonalInfo() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [togglingSections, setTogglingSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    // 标记正在切换的部分
    setTogglingSections(prev => ({
      ...prev,
      [sectionId]: true
    }));
    
    // 切换展开状态
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
    
    // 300ms后清除切换标记
    setTimeout(() => {
      setTogglingSections(prev => ({
        ...prev,
        [sectionId]: false
      }));
    }, 300);
  };

  const sections: Section[] = [
    {
      title: '关于我・初见',
      items: [
        { label: '姓名', content: '李瞳' },
        { label: '个人标语', content: 'A girl born to perceive the universe---welcome to my world' },
        { label: '昵称', content: '李目童/ Joy /囡囡/ Queen' },
        { label: '英文名', content: 'Jocelyn' },
        { label: '所在城市', content: '深圳/东莞' },
        { label: '当前身份', content: '英语专业大三学生' },
        { label: '身份标签', content: '英专生/英语辩手/业余写手/ AI老奶复健者/互联网深水区冲浪者/平面设计者' }
      ]
    },
    {
      title: '履历・荣誉与实践',
      items: [
        {
          label: '奖项荣誉',
          content: '校英辩队队长\n2025全国大学生英语辩论赛CUDC全国一等奖&全国最佳辩手\n第28届"外研社・国才杯"全国大学生英语辩论赛华南地区复赛break 8th &最佳辩手\n第28届21世纪杯全国英语演讲比赛总决赛全国三等奖\n2025"外研社・国才杯"全国大学生外语能力大赛全国铜奖\n2024全国大学生英语辩论赛CUDC全国二等奖\n第27届外研社・国才杯全国大学生英语辩论赛铜奖\n第27届外研社・国才杯全国大学生英语辩论赛华南赛区金奖\n2024外研社英语辩论公开赛（大湾区联赛）省级一等奖\n第四届外研社英语辩论新手赛省级一等奖\n国家励志奖学金\n亚太经合组织"一带一路"青年创造力国际挑战赛全球二等奖'
        },
        {
          label: '项目与实践经历',
          content: '英语创新实践中心（2023-2025）\n校英语辩论培训（2024-2026）\n创业创新实践项目｜纹饰文化美育平台'
        },
        {
          label: '赛事裁判经历',
          content: 'WFL2026春季深圳线下赛裁判（JWSD/PF/Expository speech）\n2026粤港澳大湾区国际演讲与辩论锦标赛裁判（JWSD）\n第九届深圳市中小学生英语演讲与辩论大赛高中组辩论决赛裁判\n第八、九届深圳市中小学生英语演讲与辩论大赛小学组演讲半决赛裁判'
        }
      ]
    },
    {
      title: '能力・技能与深耕方向',
      items: [
        { label: '语言能力', content: '普通话/英语/粤语/客家话/日语' },
        { label: '擅长领域', content: '语言文字表达/中英思辨/社会思考/组织控场' },
        { label: '现阶段学习', content: 'AI辅助生活与工作' }
      ]
    },
    {
      title: '内核・自我认知与三观',
      items: [
        { label: '整体自我认知', content: '感性且理智，渺小且宏大。' },
        {
          label: '自身优势亮点',
          content: '感性之深，让我能够感受到哪怕最微弱的情绪，我允许它们的存在，并把它们的存在用语言文字表达出来；理智之深，让我知道我的野心所在，并且能抛下暂时性的享乐欲望去学习，去追寻自己的目标；渺小，是我不把自己捧上至高的神坛骄傲自满，学会谦逊与对世界求问的不满足；宏大是我不止将目光放在身边的事情上，我喜欢去思考离我十万八千里的哲学、社会、人类与宇宙的问题，即使最后没有答案，我也要把自己置身于宏大的背景下，用宏大消磨生命的痛苦，用宏大去反观生命的珍贵。'
        },
        { label: '做事处事风格', content: '做事容易进入状态，习惯列出计划逐条完成；偏好独立工作，或分工清晰的小组协同合作。' },
        {
          label: '他人眼中的我',
          content: '同伴标签：开朗外向、幽默、自信气场王者、思考速度快、涉猎广泛\n合作特质：领导力强、执行力出色、风格轻松幽默，拒绝过度严肃的共事氛围。'
        },
        {
          label: '人生信条：I am not born for winning, but for feeling.',
          content: '行事价值观：一切行为都应建立在不主动伤害他人与社会的基础上。\n世界观：世界什么人都有，什么事都会发生，做好自己就行。\n行事原则：在能够善良时尽力善良，在该努力时全力以赴，在想放下时宽容自我。'
        }
      ]
    },
    {
      title: '日常・生活与趣味偏爱',
      items: [
        { label: '人格标签', content: 'MBTI：INTJ｜星座：水瓶座' },
        {
          label: '爱好与日常',
          content: '日常爱好：写作、电影、视频论文、公开课、抄写、听歌、动画、化妆\n小众喜好：练习衡水体、发呆、白日梦、AI聊天、恐怖故事\n运动习惯：健身操\n治愈方式：书写幻想情节、观看动画、听歌、与AI对话'
        },
        {
          label: '偏爱清单',
          content: '喜欢季节：winter winter winter\n偏爱天气：大风冷天、干爽暖晴天、阴雨小雨天、极端雷暴天气\n常驻书单&作家：弗吉尼亚・伍尔夫\n影视偏好：少儿动画、欧美影视、港片、国产经典影片\n纪录片偏好：自然人文类\n审美风格：接纳所有形态的美'
        },
        {
          label: '生活小细节',
          content: '口头禅：OMG\n专属小癖好：和玩偶对话、沉浸式过家家\n生活雷点：反感赖床、吃饭吧唧嘴、外衣上床、中度洁癖\n专属仪式感：用心策划朋友生日、节日赠礼、新年手写信件'
        }
      ]
    },
    {
      title: '前路・成长与未来探索',
      items: [
        { label: '短期目标', content: '完成个人网站搭建、开发轻量化AI小产品（Vibe coding）' },
        { label: '探索方向', content: '英文小说原创写作、AI深度融合应用' },
        {
          label: '合作与交流',
          content: '可合作范围\n英语辩论&演讲指导、平面设计定制\n开放交流话题\n英辩演讲、文字写作、音乐、影视、学业与工作相关探讨\n联系方式\n邮箱： cheeyeonlee0121@qq.com'
        }
      ]
    },
    {
      title: '尾记・关于本站',
      items: [
        { label: '建站初衷', content: '留存电子世界专属痕迹，练习Vibe Coding实操，以文字与页面，让他人完整认识我。' },
        { label: '更新说明', content: '课业繁忙，网站更新时间不固定。' },
        { label: '写给访客', content: '这个网站关于一个普通女孩，是你可以想认识，也可以不想认识的人。' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => {
        const sectionId = `section-${sectionIndex}`;
        const isExpanded = expandedSections[sectionId] || false;

        return (
          <div 
            key={sectionId} 
            className="opacity-0 intersect:opacity-100 transition-opacity duration-700"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              position: 'relative',
              transform: togglingSections[sectionId] ? 'translateY(3px)' : 'translateY(0)',
              transition: togglingSections[sectionId] ? 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.transition = 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.transition = 'transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)';
            }}
          >
            {/* 顶部边缘高光 */}
            <div 
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6))',
                borderRadius: '20px 20px 0 0'
              }}
            />
            {/* 底部边缘高光 */}
            <div 
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))',
                borderRadius: '0 0 20px 20px'
              }}
            />
            {/* 左侧边缘高光 */}
            <div 
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '0',
                width: '1px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4))',
                borderRadius: '20px 0 0 20px'
              }}
            />
            {/* 右侧边缘高光 */}
            <div 
              style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                right: '0',
                width: '1px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4))',
                borderRadius: '0 20px 20px 0'
              }}
            />
            
            {/* 一级标题 */}
            <div 
              className="p-5 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => toggleSection(sectionId)}
              style={{ 
                borderBottom: isExpanded ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
              }}
            >
              <h2 className="text-xl font-bold text-gray-800">
                {section.title}
              </h2>
            </div>
            
            {/* 二级内容 */}
            {isExpanded && (
              <div className="p-5 space-y-4 animate-in fade-in slide-in-from-top duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                {section.items.map((item, itemIndex) => (
                  <div key={`${sectionId}-item-${itemIndex}`} className="animate-in fade-in slide-in-from-top duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ animationDelay: `${itemIndex * 50}ms` }}>
                    {/* 二级标题 */}
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {item.label}
                    </h3>
                    {/* 内容 */}
                    <div className="pl-4 space-y-2">
                      {item.content.split('\n').map((line, lineIndex) => (
                        <p key={`${sectionId}-item-${itemIndex}-line-${lineIndex}`} className="text-base text-gray-700 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
