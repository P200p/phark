'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { User, MessageCircle, Heart, Share2, ShoppingCart, Wallet, Star, Gift, TrendingUp, Users, Settings, Plus, Coins, Trophy, Crown, Zap, Target, Share as Shark, PiggyBank, Store, CreditCard, DollarSign, HandCoins, Gamepad2, Sparkles, Eye, ThumbsUp, ThumbsDown, MessageSquare, Send, Bell, Search, Filter, MoreHorizontal, ExternalLink, Lock, Unlock, ShieldCheck, Shield, AlertTriangle, Info, CheckCircle, XCircle, Calendar, Clock, TrendingDown, ArrowUp, ArrowDown, BarChart3, PieChart, Activity, Flame, Fish, Waves, GripVertical, Move } from 'lucide-react'

// ข้อมูลจำลองผู้ใช้
const mockUser = {
  id: '1',
  name: 'สมชาย ใจดี',
  username: '@somchai_shark',
  avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  bio: 'นักเทรด Crypto และ Social Media Influencer 🦈',
  credits: 15420,
  level: 12,
  followers: 2340,
  following: 890,
  posts: 156,
  verified: true,
  joinDate: '2024-01-15',
  lastActive: 'ออนไลน์',
  reputation: 4.8,
  totalLoaned: 85000,
  totalBorrowed: 23000,
  successfulTrades: 47,
  profileTheme: 'shark-blue',
  badges: ['เทรดเดอร์มือทอง', 'ผู้ให้กู้ยืมเชื่อถือได้', 'อินฟลูเอนเซอร์ระดับ A'],
  currentPet: {
    name: 'ชาร์กี้',
    type: 'Baby Shark',
    level: 8,
    creditsPerHour: 25,
    image: '🦈'
  }
}

// ข้อมูลโพสต์จำลอง
const initialPosts = [
  {
    id: '1',
    user: mockUser,
    content: 'วันนี้ทำกำไรจากการเทรดได้ 2,500 เครดิต! 🚀 ใครอยากเรียนรู้เทคนิคเทรดมาคุยกันได้เลยนะ #SharkTrading #กำไรใหญ่',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    likes: 234,
    dislikes: 12,
    comments: 45,
    shares: 18,
    timestamp: '2 ชั่วโมงที่แล้ว',
    tags: ['เทรดดิ้ง', 'กำไร', 'เคล็ดลับ'],
    position: { x: 0, y: 0 },
    isLocked: false
  },
  {
    id: '2',
    user: { ...mockUser, name: 'แอนนา สตาร์', username: '@anna_star' },
    content: 'เปิดให้ยืมเครดิต 10,000 เครดิต ดอกเบี้ย 2% ต่อวัน คืนภายใน 7 วัน 📈 ใครสนใจติดต่อได้เลย!',
    likes: 156,
    dislikes: 8,
    comments: 32,
    shares: 12,
    timestamp: '4 ชั่วโมงที่แล้ว',
    tags: ['ให้กู้ยืม', 'ดอกเบี้ยดี', 'เชื่อถือได้'],
    position: { x: 0, y: 0 },
    isLocked: false
  },
  {
    id: '3',
    user: { ...mockUser, name: 'เจมส์ เทรดเดอร์', username: '@james_trader' },
    content: 'พึ่งซื้อธีม Golden Shark ใหม่ สวยมากเลย! ✨ ใครยังไม่มีแนะนำให้ซื้อเลย คุ้มค่ามาก',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    likes: 89,
    dislikes: 3,
    comments: 21,
    shares: 7,
    timestamp: '6 ชั่วโมงที่แล้ว',
    tags: ['ธีม', 'ช้อปปิ้ง', 'แนะนำ'],
    position: { x: 0, y: 0 },
    isLocked: false
  }
]

// ข้อมูลสินค้าในร้านค้า
const mockShopItems = [
  {
    id: '1',
    name: 'ธีม Golden Shark',
    description: 'ธีมสีทองพรีเมียมที่ทำให้โปรไฟล์เจิดจรา',
    price: 2500,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    category: 'ธีม',
    rarity: 'Epic',
    sales: 1250,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Baby Shark Pet',
    description: 'สัตว์เลี้ยงน่ารักที่ผลิตเครดิตให้ 25/ชม.',
    price: 5000,
    image: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    category: 'สัตว์เลี้ยง',
    rarity: 'Legendary',
    sales: 890,
    rating: 4.8
  },
  {
    id: '3',
    name: 'VIP Profile Frame',
    description: 'กรอบโปรไฟล์สำหรับสมาชิก VIP',
    price: 1500,
    image: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    category: 'กรอบโปรไฟล์',
    rarity: 'Rare',
    sales: 2100,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Emoji Pack Premium',
    description: 'ชุดอิโมจิพิเศษสำหรับแสดงความรู้สึก',
    price: 800,
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    category: 'อิโมจิ',
    rarity: 'Common',
    sales: 3400,
    rating: 4.6
  }
]

// ข้อมูลการกู้ยืมจำลอง
const mockLoans = [
  {
    id: '1',
    borrower: 'สมศรี ใจดี',
    amount: 5000,
    interestRate: 1.5,
    duration: '3 วัน',
    status: 'รอการอนุมัติ',
    purpose: 'ซื้อไอเทมในร้านค้า',
    reputation: 4.2,
    collateral: 'ธีม Premium Collection'
  },
  {
    id: '2',
    borrower: 'วินัย นักลงทุน',
    amount: 10000,
    interestRate: 2.0,
    duration: '7 วัน',
    status: 'อนุมัติแล้ว',
    purpose: 'ลงทุนเทรดดิ้ง',
    reputation: 4.8,
    collateral: 'Pet Collection Level 10+'
  },
  {
    id: '3',
    borrower: 'มานี เทรดเดอร์',
    amount: 3000,
    interestRate: 1.8,
    duration: '5 วัน',
    status: 'ชำระแล้ว',
    purpose: 'ซื้อธีมใหม่',
    reputation: 4.5,
    collateral: 'VIP Membership'
  }
]

// Type definitions for better TypeScript support
interface Post {
  id: string;
  user: typeof mockUser;
  content: string;
  image?: string;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  position: { x: number; y: number };
  isLocked: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('feed')
  const [newPost, setNewPost] = useState('')
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [loanAmount, setLoanAmount] = useState('')
  const [loanInterest, setLoanInterest] = useState('')
  const [loanDuration, setLoanDuration] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  
  // State สำหรับ Drag & Drop
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [draggedPost, setDraggedPost] = useState<Post | null>(null)
  const [isDragMode, setIsDragMode] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const feedContainerRef = useRef<HTMLDivElement>(null)

  // ฟังก์ชันจัดการ Drag & Drop
  const handleMouseDown = (e: React.MouseEvent, post: Post) => {
    if (!isDragMode) return
    
    e.preventDefault()
    setDraggedPost(post)
    
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedPost || !isDragMode) return
    
    e.preventDefault()
    const containerRect = feedContainerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const newX = e.clientX - containerRect.left - dragOffset.x
    const newY = e.clientY - containerRect.top - dragOffset.y

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === draggedPost.id 
          ? { ...post, position: { x: newX, y: newY } }
          : post
      )
    )
  }

  const handleMouseUp = () => {
    setDraggedPost(null)
  }

  const toggleLockPost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isLocked: !post.isLocked }
          : post
      )
    )
  }

  const resetPostPositions = () => {
    setPosts(prevPosts => 
      prevPosts.map(post => ({ 
        ...post, 
        position: { x: 0, y: 0 },
        isLocked: false 
      }))
    )
  }

  // Event listeners สำหรับ mouse events
  useEffect(() => {
    if (isDragMode) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [draggedPost, isDragMode, dragOffset])

  // ฟังก์ชันจัดการโพสต์
  const handleLike = (postId: string, isLike: boolean) => {
    console.log(`${isLike ? 'ไลค์' : 'ดิสไลค์'} โพสต์ ${postId}`)
    // ในระบบจริงจะเชื่อมกับ Supabase
  }

  const handleComment = (postId: string, comment: string) => {
    console.log(`แสดงความคิดเห็น: ${comment} ในโพสต์ ${postId}`)
  }

  const handleShare = (postId: string) => {
    console.log(`แชร์โพสต์ ${postId}`)
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      console.log('สร้างโพสต์ใหม่:', newPost)
      setNewPost('')
    }
  }

  // ฟังก์ชันจัดการร้านค้า
  const handleBuyItem = (itemId: string, price: number) => {
    if (mockUser.credits >= price) {
      console.log(`ซื้อสินค้า ${itemId} ราคา ${price} เครดิต`)
    } else {
      console.log('เครดิตไม่เพียงพอ')
    }
  }

  // ฟังก์ชันจัดการการกู้ยืม
  const handleLoanRequest = () => {
    if (loanAmount && loanInterest && loanDuration) {
      console.log('ขอกู้ยืม:', { loanAmount, loanInterest, loanDuration })
      setLoanAmount('')
      setLoanInterest('')
      setLoanDuration('')
    }
  }

  const handleApproveLoan = (loanId: string) => {
    console.log(`อนุมัติการกู้ยืม ${loanId}`)
  }

  // ฟิลเตอร์สินค้า
  const filteredItems = mockShopItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                <Shark className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  BergDotBet B.B.
                </h1>
                <p className="text-sm text-gray-600">Sharkcial - โซเชียลยุคใหม่</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                <Coins className="h-4 w-4" />
                <span className="font-semibold">{mockUser.credits.toLocaleString()}</span>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                แจ้งเตือน
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16 border-4 border-gradient-to-r from-blue-500 to-cyan-500">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{mockUser.name}</h3>
                      {mockUser.verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-gray-600">{mockUser.username}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">Level {mockUser.level}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{mockUser.bio}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">{mockUser.posts}</p>
                    <p className="text-xs text-gray-600">โพสต์</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-cyan-600">{mockUser.followers.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">ผู้ติดตาม</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-orange-600">{mockUser.following}</p>
                    <p className="text-xs text-gray-600">กำลังติดตาม</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">คะแนนความน่าเชื่อถือ</span>
                    <span className="font-semibold text-green-600">{mockUser.reputation}/5.0</span>
                  </div>
                  <Progress value={mockUser.reputation * 20} className="h-2" />
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Fish className="h-4 w-4 mr-2 text-blue-500" />
                    สัตว์เลี้ยงปัจจุบัน
                  </h4>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{mockUser.currentPet.image}</span>
                      <div>
                        <p className="text-sm font-medium">{mockUser.currentPet.name}</p>
                        <p className="text-xs text-gray-600">Level {mockUser.currentPet.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">+{mockUser.currentPet.creditsPerHour}</p>
                      <p className="text-xs text-gray-600">เครดิต/ชม.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  สถิติการเงิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ยอดให้กู้ยืม</span>
                    <span className="font-semibold text-green-600">{mockUser.totalLoaned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ยอดกู้ยืม</span>
                    <span className="font-semibold text-orange-600">{mockUser.totalBorrowed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ธุรกรรมสำเร็จ</span>
                    <span className="font-semibold text-blue-600">{mockUser.successfulTrades}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-blue-200">
                <TabsTrigger value="feed" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>ฟีด</span>
                </TabsTrigger>
                <TabsTrigger value="shop" className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>ร้านค้า</span>
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4" />
                  <span>กระเป๋า</span>
                </TabsTrigger>
                <TabsTrigger value="loans" className="flex items-center space-x-2">
                  <HandCoins className="h-4 w-4" />
                  <span>กู้ยืม</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>แอดมิน</span>
                </TabsTrigger>
              </TabsList>

              {/* Feed Tab */}
              <TabsContent value="feed" className="space-y-6">
                {/* Drag Mode Controls */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Move className="h-5 w-5 mr-2 text-purple-500" />
                        โหมดจัดเรียงโพสต์
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={isDragMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsDragMode(!isDragMode)}
                          className={isDragMode ? "bg-purple-600 hover:bg-purple-700" : ""}
                        >
                          {isDragMode ? <Lock className="h-4 w-4 mr-1" /> : <Unlock className="h-4 w-4 mr-1" />}
                          {isDragMode ? 'ปิดโหมดจัดเรียง' : 'เปิดโหมดจัดเรียง'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetPostPositions}
                          disabled={!isDragMode}
                        >
                          รีเซ็ตตำแหน่ง
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {isDragMode && (
                    <CardContent>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-700 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          คลิกและลากโพสต์เพื่อจัดเรียงตำแหน่ง • คลิกไอคอนล็อคเพื่อล็อคตำแหน่ง • โพสต์ที่ล็อคจะไม่สามารถเลื่อนได้
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Create Post */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Plus className="h-5 w-5 mr-2 text-blue-500" />
                      สร้างโพสต์ใหม่
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="คุณกำลังคิดอะไรอยู่? แชร์ความคิดเห็นของคุณกับชุมชน Sharkcial..."
                        className="min-h-[100px] border-blue-200 focus:border-blue-500"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Info className="h-4 w-4" />
                          <span>โพสต์ใหม่จะได้รับ +10 เครดิต</span>
                        </div>
                        <Button 
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          โพสต์
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Container */}
                <div 
                  ref={feedContainerRef}
                  className={`space-y-6 ${isDragMode ? 'relative min-h-[800px]' : ''}`}
                  style={{ cursor: isDragMode ? 'crosshair' : 'default' }}
                >
                  {posts.map((post) => (
                    <Card 
                      key={post.id} 
                      className={`bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDragMode ? 'absolute cursor-move' : ''
                      } ${post.isLocked ? 'ring-2 ring-green-500' : ''} ${
                        draggedPost?.id === post.id ? 'z-50 shadow-2xl scale-105' : ''
                      }`}
                      style={isDragMode ? {
                        left: `${post.position.x}px`,
                        top: `${post.position.y}px`,
                        width: '600px',
                        maxWidth: '90vw'
                      } : {}}
                      onMouseDown={(e) => !post.isLocked && handleMouseDown(e, post)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.user.avatar} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                              {post.user.verified && <ShieldCheck className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-gray-600">{post.user.username} • {post.timestamp}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isDragMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleLockPost(post.id)
                                }}
                                className={`${post.isLocked ? 'text-green-600 bg-green-50' : 'text-gray-400'}`}
                              >
                                {post.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                              </Button>
                            )}
                            {isDragMode && !post.isLocked && (
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-800 mb-4">{post.content}</p>
                        
                        {post.image && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img 
                              src={post.image} 
                              alt="Post content" 
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id, true)}
                              className="flex items-center space-x-2 hover:text-green-600 hover:bg-green-50"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id, false)}
                              className="flex items-center space-x-2 hover:text-red-600 hover:bg-red-50"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span>{post.dislikes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-2 hover:text-blue-600 hover:bg-blue-50"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(post.id)}
                              className="flex items-center space-x-2 hover:text-purple-600 hover:bg-purple-50"
                            >
                              <Share2 className="h-4 w-4" />
                              <span>{post.shares}</span>
                            </Button>
                          </div>
                          {isDragMode && (
                            <Badge variant={post.isLocked ? "default" : "secondary"} className="text-xs">
                              {post.isLocked ? 'ล็อคแล้ว' : 'สามารถเลื่อนได้'}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Shop Tab */}
              <TabsContent value="shop" className="space-y-6">
                {/* Search and Filter */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Store className="h-5 w-5 mr-2 text-green-500" />
                      ร้านค้า Sharkcial
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="ค้นหาสินค้า..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-blue-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:border-blue-500"
                        >
                          <option value="ทั้งหมด">ทั้งหมด</option>
                          <option value="ธีม">ธีม</option>
                          <option value="สัตว์เลี้ยง">สัตว์เลี้ยง</option>
                          <option value="กรอบโปรไฟล์">กรอบโปรไฟล์</option>
                          <option value="อิโมจิ">อิโมจิ</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shop Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <div className="aspect-square rounded-lg overflow-hidden mb-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`text-xs ${
                            item.rarity === 'Legendary' ? 'border-yellow-500 text-yellow-700' :
                            item.rarity === 'Epic' ? 'border-purple-500 text-purple-700' :
                            item.rarity === 'Rare' ? 'border-blue-500 text-blue-700' :
                            'border-gray-500 text-gray-700'
                          }`}>
                            {item.rarity}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{item.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Coins className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold text-lg text-gray-900">{item.price.toLocaleString()}</span>
                          </div>
                          <span className="text-xs text-gray-500">ขายแล้ว {item.sales.toLocaleString()}</span>
                        </div>

                        <Button 
                          onClick={() => handleBuyItem(item.id, item.price)}
                          disabled={mockUser.credits < item.price}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500"
                        >
                          {mockUser.credits >= item.price ? 'ซื้อเลย' : 'เครดิตไม่เพียงพอ'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Wallet className="h-5 w-5 mr-2 text-blue-500" />
                      กระเป๋าเครดิต SharkWallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {mockUser.credits.toLocaleString()}
                      </div>
                      <p className="text-gray-600">เครดิตทั้งหมด</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-green-600">+2,450</p>
                        <p className="text-sm text-gray-600">รายได้วันนี้</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <TrendingDown className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-orange-600">-890</p>
                        <p className="text-sm text-gray-600">รายจ่ายวันนี้</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <PiggyBank className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-lg font-semibold text-purple-600">+125</p>
                        <p className="text-sm text-gray-600">จากสัตว์เลี้ยง</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        โอนเครดิต
                      </Button>
                      <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                        <ArrowDown className="h-4 w-4 mr-2" />
                        รับเครดิต
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-purple-500" />
                      ประวัติการทำธุรกรรม
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'รับ', amount: '+250', description: 'ไลค์โพสต์', time: '10 นาทีที่แล้ว', icon: Heart },
                        { type: 'จ่าย', amount: '-1,500', description: 'ซื้อธีม Golden Shark', time: '2 ชั่วโมงที่แล้ว', icon: ShoppingCart },
                        { type: 'รับ', amount: '+500', description: 'โพสต์ใหม่', time: '4 ชั่วโมงที่แล้ว', icon: MessageCircle },
                        { type: 'รับ', amount: '+25', description: 'สัตว์เลี้ยงผลิต', time: '1 ชั่วโมงที่แล้ว', icon: Fish }
                      ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'รับ' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <transaction.icon className={`h-4 w-4 ${
                                transaction.type === 'รับ' ? 'text-green-600' : 'text-red-600'
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-sm text-gray-600">{transaction.time}</p>
                            </div>
                          </div>
                          <span className={`font-semibold ${
                            transaction.type === 'รับ' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Loans Tab */}
              <TabsContent value="loans" className="space-y-6">
                {/* Loan Request Form */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <HandCoins className="h-5 w-5 mr-2 text-green-500" />
                      ขอกู้ยืมเครดิต
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label htmlFor="loanAmount">จำนวนเครดิต</Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          placeholder="เช่น 5000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanInterest">ดอกเบี้ย (%/วัน)</Label>
                        <Input
                          id="loanInterest"
                          type="number"
                          step="0.1"
                          placeholder="เช่น 2.0"
                          value={loanInterest}
                          onChange={(e) => setLoanInterest(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanDuration">ระยะเวลา (วัน)</Label>
                        <Input
                          id="loanDuration"
                          type="number"
                          placeholder="เช่น 7"
                          value={loanDuration}
                          onChange={(e) => setLoanDuration(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleLoanRequest}
                      disabled={!loanAmount || !loanInterest || !loanDuration}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      ส่งคำขอกู้ยืม
                    </Button>
                  </CardContent>
                </Card>

                {/* Available Loans */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      คำขอกู้ยืมที่มีอยู่
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLoans.map((loan) => (
                        <div key={loan.id} className="p-4 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{loan.borrower.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-gray-900">{loan.borrower}</h4>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-sm text-gray-600">{loan.reputation}/5.0</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant={
                              loan.status === 'รอการอนุมัติ' ? 'secondary' :
                              loan.status === 'อนุมัติแล้ว' ? 'default' : 'outline'
                            }>
                              {loan.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">จำนวน</p>
                              <p className="font-semibold text-blue-600">{loan.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">ดอกเบี้ย</p>
                              <p className="font-semibold text-green-600">{loan.interestRate}%/วัน</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">ระยะเวลา</p>
                              <p className="font-semibold text-orange-600">{loan.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">หลักประกัน</p>
                              <p className="font-semibold text-purple-600 text-xs">{loan.collateral}</p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-3">
                            <strong>วัตถุประสงค์:</strong> {loan.purpose}
                          </p>

                          {loan.status === 'รอการอนุมัติ' && (
                            <Button 
                              onClick={() => handleApproveLoan(loan.id)}
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              อนุมัติการกู้ยืม
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Admin Tab */}
              <TabsContent value="admin" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-gray-500" />
                      แดชบอร์ดแอดมิน
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">1,234</p>
                        <p className="text-sm text-gray-600">ผู้ใช้ทั้งหมด</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">5,678</p>
                        <p className="text-sm text-gray-600">โพสต์ทั้งหมด</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Coins className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">2.5M</p>
                        <p className="text-sm text-gray-600">เครดิตในระบบ</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <HandCoins className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">89</p>
                        <p className="text-sm text-gray-600">การกู้ยืมใหม่</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center justify-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>จัดการความปลอดภัย</span>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>รายงานและสถิติ</span>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>จัดการร้านค้า</span>
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>จัดการผู้ใช้</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-green-500" />
                      สถานะระบบ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'เซิร์ฟเวอร์หลัก', status: 'ปกติ', uptime: '99.9%', color: 'green' },
                        { name: 'ฐานข้อมูล', status: 'ปกติ', uptime: '99.8%', color: 'green' },
                        { name: 'ระบบการชำระเงิน', status: 'ปกติ', uptime: '99.7%', color: 'green' },
                        { name: 'ระบบแจ้งเตือน', status: 'บำรุงรักษา', uptime: '95.2%', color: 'yellow' }
                      ].map((system, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              system.color === 'green' ? 'bg-green-500' : 
                              system.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="font-medium text-gray-900">{system.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{system.status}</p>
                            <p className="text-xs text-gray-600">Uptime: {system.uptime}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}