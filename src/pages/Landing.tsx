import { useNavigate } from "react-router-dom";
import { Shield, Mail, AlertTriangle, CheckCircle, Zap, Lock, Eye, BarChart3, Users, Globe, ArrowRight, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Gmail Integration",
      description: "Connect your Gmail account to analyze email patterns, detect suspicious senders, and identify potential phishing attempts in real-time."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Threat Detection",
      description: "Advanced AI-powered algorithms scan your emails for malicious links, suspicious attachments, and social engineering tactics."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Scoring",
      description: "Get a comprehensive security score for your email account based on sender reputation, email patterns, and threat indicators."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Behavior Monitoring",
      description: "Track unusual email activity, login patterns, and account access to detect potential compromises early."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Privacy First",
      description: "We only analyze metadata - never the content of your emails. Your privacy and data security are our top priorities."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Reports",
      description: "Generate comprehensive PDF reports with threat analysis, risk assessments, and actionable security recommendations."
    }
  ];

  const stats = [
    { value: "99.9%", label: "Threat Detection Rate" },
    { value: "50M+", label: "Emails Analyzed" },
    { value: "<1s", label: "Analysis Speed" },
    { value: "24/7", label: "Real-time Monitoring" }
  ];

  const threatTypes = [
    { name: "Phishing Attacks", percentage: 45, color: "from-red-400 to-red-600" },
    { name: "Malware Links", percentage: 25, color: "from-orange-400 to-orange-600" },
    { name: "Spam & Scams", percentage: 20, color: "from-yellow-400 to-yellow-600" },
    { name: "Spoofing", percentage: 10, color: "from-purple-400 to-purple-600" }
  ];

  return (
    <div className="min-h-screen relative z-20">
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 tahoe-glass px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">AI-Powered Security Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Email Threat
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Protect your inbox with cutting-edge AI technology. Detect phishing, malware, 
            and suspicious activity before they become threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/auth")}
              className="group tahoe-button-primary px-8 py-4 text-lg font-medium flex items-center gap-3 hover:gap-4 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="tahoe-button px-8 py-4 text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="tahoe-glass p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Comprehensive Email Security
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to protect your inbox from modern email threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="tahoe-glass p-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="tahoe-glass-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                  Real-Time Threat Intelligence
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Our platform integrates with multiple threat intelligence sources including 
                  Shodan, Censys, GreyNoise, and AlienVault to provide comprehensive protection 
                  against emerging email threats.
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Global Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium">Instant Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Team Support</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {threatTypes.map((threat, index) => (
                  <div key={index} className="tahoe-glass p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{threat.name}</span>
                      <span className="text-gray-600">{threat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${threat.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${threat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Account",
                description: "Securely link your Gmail account using Google OAuth. We never access your email content."
              },
              {
                step: "02",
                title: "Automatic Analysis",
                description: "Our AI analyzes email metadata, sender reputation, and threat indicators in real-time."
              },
              {
                step: "03",
                title: "Get Protected",
                description: "Receive instant alerts, detailed reports, and actionable recommendations to stay safe."
              }
            ].map((item, index) => (
              <div key={index} className="tahoe-glass p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="tahoe-glass-lg p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center border border-white/20">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-semibold mb-6">
                Ready to Secure Your Inbox?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                Join thousands of users who trust our platform to protect their email communications from cyber threats.
              </p>
              
              <button
                onClick={() => navigate("/auth")}
                className="group tahoe-button-primary px-10 py-5 text-xl font-medium inline-flex items-center gap-3 hover:gap-4 transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free tier available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center border border-white/20">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-semibold">Tirreno</span>
            </div>
            
            <div className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Tirreno. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
