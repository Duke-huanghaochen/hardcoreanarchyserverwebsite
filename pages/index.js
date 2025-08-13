import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [serverStatus, setServerStatus] = useState({ online: false, players: { online: 0, max: 20 } });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 更新服务器状态
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('/api/server-status');
        const data = await response.json();
        setServerStatus(data);
      } catch (error) {
        console.error('获取服务器状态失败:', error);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000); // 每30秒更新一次
    return () => clearInterval(interval);
  }, []);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动到锚点
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-dark text-light font-sans bg-noise overflow-x-hidden min-h-screen">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>极限无政府服务器 - 野生Minecraft世界</title>
        {/* 引入Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com" />
        {/* 引入Font Awesome */}
        <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        {/* 引入Google字体 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>

      {/* 配置Tailwind */}
      <script dangerouslySetInnerHTML={{ __html: `
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#00FFFF',
                secondary: '#FF5555',
                dark: '#121212',
                darker: '#0A0A0A',
                light: '#F5F5F5',
                accent: '#55FF55'
              },
              fontFamily: {
                pixel: ['Press Start 2P', 'monospace'],
                sans: ['Inter', 'sans-serif']
              },
              animation: {
                'glow': 'glow 1.5s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              },
              keyframes: {
                glow: {
                  '0%': { 'text-shadow': '0 0 5px #00FFFF, 0 0 10px #00FFFF' },
                  '100%': { 'text-shadow': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' }
                },
                float: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' }
                }
              }
            }
          }
        }
      ` }} />

      {/* 自定义工具类 */}
      <style jsx global>{`
        @layer utilities {
          .content-auto {
            content-visibility: auto;
          }
          .text-shadow {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
          }
          .glass {
            backdrop-filter: blur(8px);
            background: rgba(18, 18, 18, 0.7);
          }
        }
      `}</style>

      {/* 导航栏 */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${scrolled ? 'py-2 bg-darker/95' : 'glass'} border-b border-primary/30`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa fa-cube text-primary text-2xl"></i>
            <span className="font-pixel text-primary text-lg md:text-xl animate-glow">极限无政府</span>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-light hover:text-primary transition-colors duration-300">首页</button>
            <button onClick={() => scrollToSection('features')} className="text-light hover:text-primary transition-colors duration-300">服务器特色</button>
            <button onClick={() => scrollToSection('rules')} className="text-light hover:text-primary transition-colors duration-300">生存规则</button>
            <button onClick={() => scrollToSection('connect')} className="text-light hover:text-primary transition-colors duration-300">加入服务器</button>
            <button onClick={() => scrollToSection('support')} className="text-light hover:text-primary transition-colors duration-300">支持我们</button>
          </div>

          {/* 移动菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-light hover:text-primary"
            aria-label="菜单"
          >
            <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* 移动导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-darker/95 border-t border-primary/30 animate-fadeIn">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-light hover:text-primary py-2 border-b border-gray-800 transition-colors duration-300">首页</button>
              <button onClick={() => scrollToSection('features')} className="text-left text-light hover:text-primary py-2 border-b border-gray-800 transition-colors duration-300">服务器特色</button>
              <button onClick={() => scrollToSection('rules')} className="text-left text-light hover:text-primary py-2 border-b border-gray-800 transition-colors duration-300">生存规则</button>
              <button onClick={() => scrollToSection('connect')} className="text-left text-light hover:text-primary py-2 border-b border-gray-800 transition-colors duration-300">加入服务器</button>
              <button onClick={() => scrollToSection('support')} className="text-left text-light hover:text-primary py-2 transition-colors duration-300">支持我们</button>
            </div>
          </div>
        )}
      </nav>

      {/* 英雄区 */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8 animate-float">
              <img
                src="https://picsum.photos/seed/minecraft/200/200"
                alt="Minecraft Logo"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary/50 shadow-lg shadow-primary/20"
              />
              <div className="absolute -top-3 -right-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-pulse-slow">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                {serverStatus.online ? '在线' : '离线'}
              </div>
            </div>

            <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] mb-6 text-shadow text-primary animate-glow">极限无政府服务器</h1>
            <p className="text-lg md:text-xl text-light/80 max-w-2xl mb-8">
              一个没有规则、没有保护的野生Minecraft世界。在这里，一切由你掌控，生存或是毁灭，全凭你的智慧与勇气。
            </p>

            {/* 服务器状态卡片 */}
            <div className="bg-darker border border-primary/30 rounded-xl p-6 w-full max-w-3xl shadow-lg mb-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2 text-light">服务器状态</h2>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${serverStatus.online ? 'bg-accent' : 'bg-secondary'} animate-pulse`}></span>
                    <span className={`text-lg ${serverStatus.online ? 'text-accent' : 'text-secondary'}`}>
                      {serverStatus.online ? '在线' : '离线'}
                    </span>
                  </div>
                  <p className="text-light/70">玩家数量: {serverStatus.players.online}/{serverStatus.players.max}</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                  <button
                    onClick={() => scrollToSection('connect')}
                    className="bg-primary hover:bg-primary/80 text-dark font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <i className="fa fa-server"></i>
                    <span>立即加入</span>
                  </button>
                  <p className="text-sm text-light/50 italic">版本: 1.20.4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服务器特色 */}
      <section id="features" className="py-16 md:py-24 bg-darker/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">服务器特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark border border-primary/30 rounded-lg p-6 hover:border-primary/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-skull text-secondary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">死亡惩罚</h3>
              <p className="text-light/70">死亡后掉落所有物品，经验清零，随机传送至世界某处。真正的极限生存体验。</p>
            </div>

            <div className="bg-dark border border-primary/30 rounded-lg p-6 hover:border-primary/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-balance-scale text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">同权腐竹</h3>
              <p className="text-light/70">腐竹与玩家享有同等权利，无特殊权限，不参与游戏内争斗，仅维护服务器稳定。</p>
            </div>

            <div className="bg-dark border border-primary/30 rounded-lg p-6 hover:border-primary/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-moon-o text-accent text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">丰碑园</h3>
              <p className="text-light/70">服务器内设有丰碑园，记录那些在极限生存中取得卓越成就的玩家名字。</p>
            </div>

            <div className="bg-dark border border-primary/30 rounded-lg p-6 hover:border-primary/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-book text-secondary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">历史书</h3>
              <p className="text-light/70">服务器重大事件将被记录在历史书中，供后人查阅。你的故事也可能被载入史册。</p>
            </div>
          </div>

          {/* 腐竹工作清单 */}
          <div className="mt-16 bg-dark border border-primary/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">腐竹工作清单</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-accent">
                  <i className="fa fa-check-circle"></i> 日常三件事
                </h4>
                <ul className="space-y-3 text-light/80">
                  <li className="flex items-start gap-2">
                    <i className="fa fa-check text-accent mt-1"></i>
                    <span>确保服务器稳定运行</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-check text-accent mt-1"></i>
                    <span>处理玩家举报的外挂行为</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-check text-accent mt-1"></i>
                    <span>记录服务器重大事件</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                  <i className="fa fa-star"></i> 特殊任务
                </h4>
                <ul className="space-y-3 text-light/80">
                  <li className="flex items-start gap-2">
                    <i className="fa fa-star text-primary mt-1"></i>
                    <span>定期举办服务器活动</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-star text-primary mt-1"></i>
                    <span>收集玩家反馈并优化服务器</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-star text-primary mt-1"></i>
                    <span>维护服务器历史记录</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-secondary">
                  <i className="fa fa-ban"></i> 绝对不做
                </h4>
                <ul className="space-y-3 text-light/80">
                  <li className="flex items-start gap-2">
                    <i className="fa fa-ban text-secondary mt-1"></i>
                    <span>不参与游戏内争斗</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-ban text-secondary mt-1"></i>
                    <span>不向任何玩家提供物品或优势</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-ban text-secondary mt-1"></i>
                    <span>不以权谋私，保持公正</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 生存规则 */}
      <section id="rules" className="py-16 md:py-24 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">生存规则</h2>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-secondary">
                <i className="fa fa-heartbeat"></i> 死亡机制
              </h3>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>死亡后掉落所有物品和经验</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>随机传送至世界某处重生</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>死亡地点不会有标记，需自行记忆</span>
                </li>
              </ul>
            </div>

            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <i className="fa fa-balance-scale"></i> 同权规则
              </h3>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>所有玩家（包括腐竹）享有同等游戏权利</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>禁止任何形式的作弊、外挂行为</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>严禁利用游戏漏洞获取不正当优势</span>
                </li>
              </ul>
            </div>

            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent">
                <i className="fa fa-trophy"></i> 丰碑申请
              </h3>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>在游戏中取得重大成就可申请丰碑</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>申请需提供截图或视频证据</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>丰碑审核通过后将被永久记录</span>
                </li>
              </ul>
            </div>

            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-light">
                <i className="fa fa-comments"></i> 群聊潜规则
              </h3>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>禁止发表色情、暴力、政治等敏感内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>尊重他人，禁止人身攻击和侮辱</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa fa-circle text-xs text-primary mt-2"></i>
                  <span>服务器相关问题请@管理员</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 加入服务器 */}
      <section id="connect" className="py-16 md:py-24 bg-darker/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">加入服务器</h2>
          <div className="max-w-3xl mx-auto bg-dark border border-primary/30 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-server text-primary text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-light">服务器信息</h3>
              <p className="text-light/70">复制以下信息，在Minecraft中直接连接</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-darker rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-light/50 mb-1">服务器IP</p>
                <p className="text-xl font-mono text-primary" id="server-ip">play.simpfun.cn</p>
              </div>

              <div className="bg-darker rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-light/50 mb-1">端口</p>
                <p className="text-xl font-mono text-primary" id="server-port">16061</p>
              </div>

              <div className="bg-darker rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-light/50 mb-1">版本</p>
                <p className="text-xl font-mono text-primary">1.20.4</p>
              </div>
            </div>

            <div className="space-y-4 text-light/80">
              <h4 className="text-lg font-semibold text-light mb-2">加入步骤</h4>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>启动Minecraft，确保版本为1.20.4</li>
                <li>点击"多人游戏" &gt; "添加服务器"</li>
                <li>输入服务器名称（任意）</li>
                <li>复制粘贴上方服务器IP和端口</li>
                <li>点击"完成"，然后双击服务器连接</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 支持我们 */}
      <section id="support" className="py-16 md:py-24 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">支持我们</h2>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent">捐款用途</h3>
                <ul className="space-y-3 text-light/80">
                  <li className="flex items-start gap-2">
                    <i className="fa fa-server text-primary mt-1"></i>
                    <span>服务器租赁费用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-bolt text-primary mt-1"></i>
                    <span>网络带宽升级</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-microchip text-primary mt-1"></i>
                    <span>硬件配置提升</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-gift text-primary mt-1"></i>
                    <span>举办服务器活动奖品</span>
                  </li>
                </ul>
              </div>

              <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4 text-secondary">免责声明</h3>
                <ul className="space-y-3 text-light/80">
                  <li className="flex items-start gap-2">
                    <i className="fa fa-exclamation-triangle text-secondary mt-1"></i>
                    <span>捐款为自愿行为，无任何回报</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-exclamation-triangle text-secondary mt-1"></i>
                    <span>服务器运营存在不确定性，不保证永久运行</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fa fa-exclamation-triangle text-secondary mt-1"></i>
                    <span>捐款后不因任何原因退款</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 md:p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-light">捐赠方式</h3>
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-3 bg-darker px-6 py-3 rounded-lg border border-primary/20 w-full max-w-md">
                  <i className="fa fa-credit-card text-primary text-xl"></i>
                  <div className="text-left">
                    <p className="text-sm text-light/50">支付宝</p>
                    <p className="text-primary font-mono">alipay@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-darker px-6 py-3 rounded-lg border border-primary/20 w-full max-w-md">
                  <i className="fa fa-wechat text-primary text-xl"></i>
                  <div className="text-left">
                    <p className="text-sm text-light/50">微信支付</p>
                    <p className="text-primary font-mono">wechatpay@example.com</p>
                  </div>
                </div>

                <p className="text-light/70 mt-4">所有捐款将用于服务器维护和发展，感谢您的支持！</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-darker py-12 border-t border-primary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="fa fa-cube text-primary text-2xl"></i>
                <span className="font-pixel text-primary text-lg animate-glow">极限无政府</span>
              </div>
              <p className="text-light/70 mb-4">一个没有规则、没有保护的野生Minecraft世界。</p>
              <div className="flex gap-4">
                <a href="#" className="text-light/70 hover:text-primary transition-colors duration-300">
                  <i className="fa fa-github text-xl"></i>
                </a>
                <a href="#" className="text-light/70 hover:text-primary transition-colors duration-300">
                  <i className="fa fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-light/70 hover:text-primary transition-colors duration-300">
                  <i className="fa fa-youtube-play text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-light font-bold mb-4">快速链接</h4>
              <ul className="space-y-2 text-light/70">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors duration-300">首页</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors duration-300">服务器特色</button></li>
                <li><button onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors duration-300">生存规则</button></li>
                <li><button onClick={() => scrollToSection('connect')} className="hover:text-primary transition-colors duration-300">加入服务器</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-light font-bold mb-4">服务器信息</h4>
              <ul className="space-y-2 text-light/70">
                <li className="flex items-center gap-2">
                  <i className="fa fa-server text-primary"></i>
                  <span>IP: play.simpfun.cn</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa fa-keyboard-o text-primary"></i>
                  <span>端口: 16061</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa fa-gamepad text-primary"></i>
                  <span>版本: 1.20.4</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-light font-bold mb-4">联系我们</h4>
              <ul className="space-y-2 text-light/70">
                <li className="flex items-center gap-2">
                  <i className="fa fa-envelope text-primary"></i>
                  <span>contact@example.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa fa-comments text-primary"></i>
                  <span>QQ群: 123456789</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/20 text-center text-light/50 text-sm">
            <p>© 2025 极限无政府服务器. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`,"query_language":"Chinese"}}`
