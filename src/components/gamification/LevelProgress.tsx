import React from 'react'
import { motion } from 'framer-motion'
import { UserLevel } from '../../types/gamification'
import { Star, Trophy, Zap } from 'lucide-react'

interface LevelProgressProps {
  userLevel: UserLevel
  showDetails?: boolean
  className?: string
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  userLevel,
  showDetails = false,
  className = ''
}) => {
  const progressPercentage = (userLevel.xp / userLevel.xp_to_next_level) * 100

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'from-purple-500 to-pink-500'
    if (level >= 25) return 'from-blue-500 to-purple-500'
    if (level >= 10) return 'from-green-500 to-blue-500'
    return 'from-yellow-500 to-orange-500'
  }

  const getLevelTitle = (level: number) => {
    if (level >= 100) return 'Leggenda di Nuvolino'
    if (level >= 75) return 'Maestro della Nuvola'
    if (level >= 50) return 'Esperto Nuvolino'
    if (level >= 25) => 'Amico di Nuvolino'
    if (level >= 10) => 'Nuvolino Apprendista'
    return 'Nuvolino Novizio'
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Level Badge */}
      <div className="flex items-center space-x-3">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-br ${getLevelColor(userLevel.level)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(135, 206, 235, 0.4)',
              '0 0 0 10px rgba(135, 206, 235, 0)',
              '0 0 0 0 rgba(135, 206, 235, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {userLevel.level}
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-nuvolino-700">
              Livello {userLevel.level}
            </h3>
            {userLevel.prestige > 0 && (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                <Star className="w-3 h-3" />
                <span>P{userLevel.prestige}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-cloud-600">
            {getLevelTitle(userLevel.level)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-cloud-600">Progresso</span>
          <span className="font-medium text-nuvolino-700">
            {userLevel.xp.toLocaleString()} / {userLevel.xp_to_next_level.toLocaleString()} XP
          </span>
        </div>
        
        <div className="w-full bg-cloud-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getLevelColor(userLevel.level)} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        
        <div className="text-xs text-cloud-500 text-center">
          {userLevel.xp_to_next_level - userLevel.xp} XP mancanti per il livello {userLevel.level + 1}
        </div>
      </div>

      {/* Stats */}
      {showDetails && (
        <motion.div
          className="grid grid-cols-3 gap-4 pt-4 border-t border-cloud-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-nuvolino-400 to-nuvolino-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-nuvolino-700">
              {userLevel.total_xp.toLocaleString()}
            </div>
            <div className="text-xs text-cloud-600">XP Totali</div>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-nuvolino-700">
              {userLevel.level}
            </div>
            <div className="text-xs text-cloud-600">Livello</div>
          </div>
          
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-nuvolino-700">
              {userLevel.prestige}
            </div>
            <div className="text-xs text-cloud-600">Prestigio</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LevelProgress
