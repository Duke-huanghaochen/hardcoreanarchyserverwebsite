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

      {/* 服务器状态指示器 - 右上角固定 */}
      <div className="fixed top-20 right-4 md:top-24 md:right-8 bg-dark/80 border border-primary/30 rounded-lg p-3 z-40 glass">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-3 h-3 rounded-full ${serverStatus.online ? 'bg-accent' : 'bg-secondary'} animate-pulse`}></span>
          <span className="text-sm font-medium">服务器状态: {serverStatus.online ? '正常运行中' : '离线'}</span>
        </div>
        <div className="text-xs text-light/70">
          <span>玩家数量: {serverStatus.players.online}/{serverStatus.players.max}</span>
        </div>
      </div>

      {/* 导航栏 */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${scrolled ? 'py-2 bg-darker/95' : 'glass'} border-b border-primary/30`} id="navbar">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fa fa-cube text-primary text-2xl"></i>
            <span className="font-pixel text-primary text-lg animate-glow">极限无政府</span>
          </div>
          
          {/* 桌面导航 */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors duration-300">关于服务器</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors duration-300">特色玩法</button>
            <button onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors duration-300">生存规则</button>
            <button onClick={() => scrollToSection('connect')} className="hover:text-primary transition-colors duration-300">加入我们</button>
            <button onClick={() => scrollToSection('support')} className="hover:text-primary transition-colors duration-300">支持我们</button>
          </div>
          
          {/* 移动菜单按钮 */}
          <button
            id="menuBtn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-light text-xl"
            aria-label="菜单"
          >
            <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* 移动导航菜单 */}
        <div id="mobileMenu" className={`md:hidden absolute top-full left-0 w-full bg-darker border-t border-primary/30 py-4 px-4 flex flex-col gap-4 glass ${mobileMenuOpen ? '' : 'hidden'}`}>
          <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors duration-300 text-left">关于服务器</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors duration-300 text-left">特色玩法</button>
          <button onClick={() => scrollToSection('rules')} className="hover:text-primary transition-colors duration-300 text-left">生存规则</button>
          <button onClick={() => scrollToSection('connect')} className="hover:text-primary transition-colors duration-300 text-left">加入我们</button>
          <button onClick={() => scrollToSection('support')} className="hover:text-primary transition-colors duration-300 text-left">支持我们</button>
        </div>
      </nav>

      {/* 英雄区 */}
      <header id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-darker via-dark to-darker z-0"></div>
        {/* 背景动态效果 */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[10%] left-[15%] w-40 h-40 rounded-full bg-primary/30 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] right-[10%] w-60 h-60 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-[40%] right-[25%] w-32 h-32 rounded-full bg-accent/20 blur-3xl animate-pulse-slow delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 z-10 text-center">
          <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] text-primary mb-4 animate-glow leading-tight">极限无政府服务器</h1>
          <p className="font-pixel text-[clamp(1rem,2vw,1.5rem)] text-primary/80 mb-6">hardcore anarchy server</p>
          <h2 className="text-[clamp(1.2rem,3vw,1.8rem)] mb-4 text-shadow max-w-3xl mx-auto">一个「连腐竹都在挖矿」的无政府服务器</h2>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-light/80 mb-8 max-w-2xl mx-auto">An Anarchy Server Where Even the Admin Mines Ore</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button onClick={() => scrollToSection('connect')} className="bg-primary hover:bg-primary/90 text-darker font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 font-pixel text-sm">
              <i className="fa fa-server mr-2"></i>加入服务器
            </button>
            <button onClick={() => scrollToSection('home')} className="bg-transparent border-2 border-primary hover:bg-primary/10 text-primary font-bold py-3 px-8 rounded-lg transition-all duration-300 font-pixel text-sm">
              <i className="fa fa-info-circle mr-2"></i>了解更多
            </button>
          </div>
          <div className="text-secondary font-pixel text-[clamp(1rem,2vw,1.2rem)] animate-float">
            <i className="fa fa-quote-left mr-2"></i>来活，来折腾，来留痕迹<i className="fa fa-quote-right ml-2"></i>
          </div>
          <p className="text-secondary/70 mt-2">Come Survive, Create Chaos, Leave Your Mark</p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('features')} className="text-primary/80 hover:text-primary transition-colors duration-300">
            <i className="fa fa-chevron-down text-2xl"></i>
          </button>
        </div>
      </header>

      {/* 关于服务器 */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.5rem)] text-primary mb-4 animate-glow inline-block">关于服务器</h2>
            <div className="w-32 h-1 bg-primary/50 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h3 class="text-2xl font-bold mb-6 text-light">欢迎来到没有特权的野生世界</h3>
              <p class="text-light/80 mb-4 italic">Welcome to a Wild World Without Privileges</p>
              <p class="mb-6 text-light/90 leading-relaxed">
                这里没有管理员追着你喊 "不许拆家"，没有规则限制你 "必须合作"，但有一条铁律：谁都得认 "死了掉光装备，7 天不准上线" 的命。你可以当独行侠挖矿，也可以组队抢资源，甚至拆了别人的家 —— 但后果自己扛，没人会用权限帮你兜底，包括腐竹。
              </p>
              <p class="mb-6 text-light/70 leading-relaxed text-sm md:text-base">
                No admins yelling "stop griefing" or forcing cooperation here. But one iron rule: Die, lose all your gear, and get banned for 7 days. Mine solo, team up to raid, or even blow up others' bases — but you deal with the consequences. No admin favors, not even for the server host ("Fuzhu").
              </p>
              <div class="flex items-center gap-4 mt-8">
                <div class="flex -space-x-3">
                  <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-dark"><i class="fa fa-user"></i></div>
                  <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-dark"><i class="fa fa-user"></i></div>
                  <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center border-2 border-dark"><i class="fa fa-user"></i></div>
                  <div class="w-10 h-10 rounded-full bg-darker flex items-center justify-center border-2 border-dark text-primary">+12</div>
                </div>
                <p class="text-light/70 text-sm">已有玩家正在野生存活</p>
              </div>
            </div>
            <div class="order-1 md:order-2 relative">
              <div class="aspect-square rounded-xl overflow-hidden shadow-2xl shadow-primary/20 relative group">
                <img src="https://picsum.photos/800/800?random=1" alt="Minecraft无政府服务器" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-70"></div>
                <div class="absolute bottom-6 left-6 right-6">
                  <div class="bg-darker/80 backdrop-blur-sm p-4 rounded-lg border-l-4 border-primary">
                    <p class="font-pixel text-primary text-sm mb-1">服务器状态</p>
                    <div class="flex items-center gap-2">
                      <span class="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span class="text-light/90 text-sm">正常运行中</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 装饰元素 */}
              <div class="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-lg -z-10"></div>
              <div class="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-secondary/30 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色玩法 */}
      <section id="features" className="py-20 bg-darker relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.5rem)] text-primary mb-4 animate-glow inline-block">特色玩法</h2>
            <div className="w-32 h-1 bg-primary/50 mx-auto mt-4"></div>
            <p className="mt-6 text-light/70 max-w-2xl mx-auto">体验最纯粹的Minecraft生存，没有规则束缚，只有弱肉强食的真实世界</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <i className="fa fa-heartbeat text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">死亡惩罚</h3>
              <p className="text-sm text-light/70 mb-4">掉装备、禁登录，7天内只能看着别人挖矿（可捐款提前返回）</p>
              <div className="h-1 w-12 bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300"></div>
            </div>
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <i className="fa fa-user-secret text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">同权腐竹</h3>
              <p className="text-sm text-light/70 mb-4">腐竹和你拥有相同的游戏权限，一起挖矿探索，共同体验游戏乐趣</p>
              <div className="h-1 w-12 bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300"></div>
            </div>
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <i className="fa fa-university text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">丰碑园</h3>
              <p className="text-sm text-light/70 mb-4">捐款支持服务器，你的名字将永久刻在游戏内的丰碑上</p>
              <div className="h-1 w-12 bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300"></div>
            </div>
            <div className="bg-dark/50 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <i className="fa fa-book text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-light">历史书</h3>
              <p className="text-sm text-light/70 mb-4">记录服务器大事和玩家故事，每周自动备份到社区云盘</p>
              <div className="h-1 w-12 bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300"></div>
            </div>
          </div>

          {/* 腐竹的工作清单 */}
          <div className="mt-24 max-w-4xl mx-auto bg-dark/80 backdrop-blur-md p-8 rounded-xl border border-primary/20">
            <h3 className="font-pixel text-xl text-primary mb-6 text-center">腐竹的 "工作清单"</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fa fa-check text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold text-light mb-1">日常三件事</h4>
                  <p className="text-light/70 text-sm">维护服务器稳定、参与社区讨论、与玩家共同游戏。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fa fa-check text-primary"></i>
                </div>
                <div>
                  <h4 className="font-bold text-light mb-1">特殊任务</h4>
                  <p className="text-light/70 text-sm">处理服务器技术问题、定期备份数据、组织社区活动。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fa fa-times text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-bold text-light mb-1">绝对不做</h4>
                  <p className="text-light/70 text-sm">不使用权限改装备、不干预玩家冲突、不特殊标识身份，与所有玩家共同维护公平游戏环境</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 生存规则 */}
      <section id="rules" className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.5rem)] text-primary mb-4 animate-glow inline-block">生存规则</h2>
            <div className="w-32 h-1 bg-primary/50 mx-auto mt-4"></div>
            <p className="mt-6 text-light/70 max-w-2xl mx-auto">规则只有一条：活下去，但要记住这些潜规则</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* 规则卡片 */}
            <div className="bg-dark/70 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary/30 transition-colors duration-300">1</div>
                <h3 className="font-bold text-xl text-light">死亡不是终点</h3>
              </div>
              <p className="text-light/70 mb-4 text-sm">死了掉光装备，7天内不能上线。想提前回来？捐点小钱买张 "加速复活卡"，3天就能归队。</p>
              <p className="text-light/50 text-xs italic">Death means losing all gear and a 7-day ban. Donate for a "Resurrection Card" to return in 3 days.</p>
            </div>
            <div className="bg-dark/70 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary/30 transition-colors duration-300">2</div>
                <h3 className="font-bold text-xl text-light">腐竹与玩家同权</h3>
              </div>
              <p className="text-light/70 mb-4 text-sm">腐竹使用普通账号游戏，与大家一样挖矿、探险、获取装备，共同遵守服务器规则</p>
              <p className="text-light/50 text-xs italic">Fuzhu plays with a regular account, mining, exploring, and obtaining gear just like everyone else, abiding by server rules together.</p>
            </div>
            <div className="bg-dark/70 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary/30 transition-colors duration-300">3</div>
                <h3 className="font-bold text-xl text-light">丰碑申请规则</h3>
              </div>
              <p className="text-light/70 mb-4 text-sm">捐够1000元想上丰碑？先截图支付记录甩给腐竹（QQ/群内私聊），3天内没发？算你自动放弃。</p>
              <p className="text-light/50 text-xs italic">Donate ¥1000 for a monument spot? Screenshot proof and DM Fuzhu within 3 days — no screenshot = no spot.</p>
            </div>
            <div className="bg-dark/70 backdrop-blur-sm p-6 rounded-xl border border-light/10 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary/30 transition-colors duration-300">4</div>
                <h3 className="font-bold text-xl text-light">群聊潜规则</h3>
              </div>
              <p className="text-light/70 mb-4 text-sm">群里只聊 "服务器炸了没" "哪有钻石矿"，不解决 "谁欺负我"——有本事打回去，没本事攒装备。</p>
              <p className="text-light/50 text-xs italic">Chat about server status/diamond spots — no "he griefed me" drama. Fight back or grind gear, your call.</p>
            </div>
          </div>

          {/* 重要提示 */}
          <div className="mt-16 max-w-3xl mx-auto bg-secondary/10 border-l-4 border-secondary p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <i className="fa fa-exclamation-triangle text-secondary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-light mb-2">唯一的 "潜规则"：别问 "腐竹是谁"</h4>
                <p className="text-light/70 text-sm mb-3">他和你用同一个账号，穿铁甲、扛铁镐，挖矿时会迷路，被抢了只会蹲地上画圈圈，进组织喊 "老大" 比谁都快。</p>
                <p className="text-light/70 text-sm"><strong>提示：腐竹（fuzhu）即服务器管理员（admin）</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入我们 */}
      <section id="connect" className="py-20 bg-darker relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.5rem)] text-primary mb-4 animate-glow inline-block">加入我们</h2>
            <div className="w-32 h-1 bg-primary/50 mx-auto mt-4"></div>
            <p className="mt-6 text-light/70 max-w-2xl mx-auto">准备好进入这个没有特权的野生世界了吗？</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-dark/60 backdrop-blur-sm p-8 rounded-xl border border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-light">如何加入服务器</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa fa-users text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-light mb-1">步骤 1：加入QQ群</h4>
                    <p className="text-light/70 text-sm">首先加入我们的QQ群，群号：<span className="text-primary font-bold">123456789</span>（示例群号）</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa fa-server text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-light mb-1">步骤 2：获取服务器地址</h4>
                    <p className="text-light/70 text-sm">群文件中获取最新服务器IP地址和端口号</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fa fa-gamepad text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-light mb-1">步骤 3：开始游戏</h4>
                    <p className="text-light/70 text-sm">打开Minecraft，添加服务器，开始你的无政府生存之旅</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="inline-block bg-primary hover:bg-primary/90 text-darker font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 font-pixel text-sm w-full text-center">
                  <i className="fa fa-qrcode mr-2"></i>扫码加入QQ群
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl shadow-primary/20 relative group">
                <img src="https://picsum.photos/800/800?random=2" alt="Minecraft游戏截图" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-darker/80 backdrop-blur-sm p-4 rounded-lg border-l-4 border-accent">
                    <p className="font-pixel text-accent text-sm mb-1">开服状态</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-light/90 text-sm">已开服</span>
                      </div>
                      <span className="text-light/90 text-sm">{serverStatus.players.online}/20 玩家在线</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-lg -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 border-2 border-secondary/30 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 支持我们 */}
      <section id="support" className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.5rem)] text-primary mb-4 animate-glow inline-block">支持我们</h2>
            <div className="w-32 h-1 bg-primary/50 mx-auto mt-4"></div>
            <p className="mt-6 text-light/70 max-w-2xl mx-auto">你的支持是服务器持续运营的动力</p>
          </div>
          <div className="max-w-4xl mx-auto bg-dark/70 backdrop-blur-sm p-8 rounded-xl border border-primary/20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-light">捐款用途与免责声明</h3>
                <p className="text-light/70 mb-6 text-sm">
                  您的捐款将<strong>仅用于</strong>以下用途：
                </p>
                <ul className="space-y-3 mb-8 text-sm text-light/80">
                  <li className="flex items-center gap-2">
                    <i className="fa fa-check-circle text-accent"></i>
                    <span>Minecraft服务器维护与运营成本</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa fa-check-circle text-accent"></i>
                    <span>网站服务器托管费用</span>
                  </li>
                </ul>
                <div className="bg-darker/80 p-4 rounded-lg border-l-4 border-accent mb-6">
                  <p className="text-light/90 text-sm font-bold mb-2"><i className="fa fa-info-circle mr-2"></i>免责声明</p>
                  <p className="text-light/70 text-xs">所有捐款仅用于服务器相关开支，不用于任何个人用途或其他商业活动。捐款明细将定期在QQ群文件公示。</p>
                </div>
              </div>
              <div className="bg-darker/80 p-6 rounded-xl border border-primary/30">
                <h4 className="font-bold text-lg text-primary mb-4 text-center">捐赠方式与备注说明</h4>
                <div className="mb-6 flex justify-center">
                  <div className="w-40 h-40 bg-dark rounded-lg flex items-center justify-center border border-primary/20">
                    <span className="text-light/50 text-xs text-center"><i className="fa fa-qrcode text-2xl block mb-2"></i>微信收款码</span>
                  </div>
                </div>
                <p className="text-light/70 text-sm mb-4 text-center">
                  您可以加入QQ群后获取微信收款码。
                </p>
                <p className="text-light/70 text-sm mb-4 text-center">
                  <i className="fa fa-exclamation-circle text-secondary mr-1"></i>为了避免账号被风控，请保证单次捐赠每笔小于10人民币
                </p>
                <p className="text-light/70 text-sm mb-4">
                  捐赠时请在备注中填写您的<strong>玩家ID</strong>，我们将把您的ID添加到游戏内的"丰碑园"中永久展示。
                </p>
                <p className="text-light/70 text-sm">
                  如不需要在丰碑园展示您的ID，请在备注中留空或填写"无需展示"。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-darker py-12 border-t border-primary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex items-center gap-2">
              <i className="fa fa-cube text-primary text-2xl"></i>
              <span className="font-pixel text-primary text-lg animate-glow">极限无政府</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => scrollToSection('home')} className="text-light/60 hover:text-primary transition-colors duration-300"><i className="fa fa-info-circle text-xl"></i></button>
              <button onClick={() => scrollToSection('features')} className="text-light/60 hover:text-primary transition-colors duration-300"><i className="fa fa-star text-xl"></i></button>
              <button onClick={() => scrollToSection('rules')} className="text-light/60 hover:text-primary transition-colors duration-300"><i className="fa fa-book text-xl"></i></button>
              <button onClick={() => scrollToSection('connect')} className="text-light/60 hover:text-primary transition-colors duration-300"><i className="fa fa-users text-xl"></i></button>
              <button onClick={() => scrollToSection('support')} className="text-light/60 hover:text-primary transition-colors duration-300"><i className="fa fa-heart text-xl"></i></button>
            </div>
          </div>
          <div className="border-t border-light/10 pt-8 text-center text-light/50 text-sm">
            <p className="mb-2">极限无政府服务器 - 一个连腐竹都在挖矿的无政府服务器</p>
            <p>© 2023 极限无政府服务器 版权所有</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`,"query_language":"Chinese"}}`
