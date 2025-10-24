import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/HorseList.vue'
import { store } from '@/store'
import type { Horse } from '@/types'

describe('HorseList', () => {
  const mountComponent = () => mount(HorseList, { global: { plugins: [store] } })

  beforeEach(() => {
    store.commit('RESET_GAME')
  })

  it('renders the component', () => {
    const wrapper = mountComponent()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.horse-list__horse-table').exists()).toBe(true)
  })

  it('displays table headers', () => {
    const wrapper = mountComponent()

    const headers = wrapper.findAll('th')
    expect(headers.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Condition')
    expect(wrapper.text()).toContain('Color')
  })

  it('displays horses when they exist in store', () => {
    const mockHorses: Horse[] = [
      { id: 1, name: 'Thunder Bolt', condition: 85, color: '#FF6B6B', position: 0 },
      { id: 2, name: 'Lightning Speed', condition: 90, color: '#4ECDC4', position: 0 },
    ]
    store.state.allHorses = mockHorses

    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Thunder Bolt')
    expect(wrapper.text()).toContain('Lightning Speed')
    expect(wrapper.text()).toContain('85')
    expect(wrapper.text()).toContain('90')
  })

  it('displays correct horse count in header', () => {
    const mockHorses: Horse[] = [
      { id: 1, name: 'Horse 1', condition: 80, color: '#FF6B6B', position: 0 },
      { id: 2, name: 'Horse 2', condition: 90, color: '#4ECDC4', position: 0 },
      { id: 3, name: 'Horse 3', condition: 75, color: '#FFE66D', position: 0 },
    ]
    store.state.allHorses = mockHorses

    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Horse List 1-3')
  })

  it('displays horse colors', () => {
    const mockHorse: Horse = {
      id: 1,
      name: 'Red Runner',
      condition: 85,
      color: '#FF6B6B',
      position: 0,
    }
    store.state.allHorses = [mockHorse]

    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Red')
    const colorBox = wrapper.find('.horse-list__color-box')
    expect(colorBox.exists()).toBe(true)
  })

  it('renders all 20 horses when initialized', () => {
    store.commit('INITIALIZE_HORSES')

    const wrapper = mountComponent()

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(20)
  })
})
