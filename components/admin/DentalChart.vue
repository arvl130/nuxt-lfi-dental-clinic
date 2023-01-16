<script setup>
import { onMounted, reactive, ref } from "vue"
import dentalChart from "~/assets/img/dental-chart.jpg"
import { getDentalChart, saveDentalChart } from "~/utils/api/charts/DentalChart"
const props = defineProps({
  strokeColor: String,
  patientUid: String,
})

const originalDataUrl = ref(null)

// create canvas element and append it to document body
const canvas = ref()
const ctx = ref(null)
const lastKnownPos = reactive({
  x: 0,
  y: 0,
})

onMounted(async () => {
  originalDataUrl.value = await getDentalChart(props.patientUid)
  ctx.value = canvas.value.getContext("2d")
  resize()

  if (originalDataUrl.value) {
    const img = new Image()
    img.src = originalDataUrl.value
    img.onload = () => {
      ctx.value.drawImage(img, 0, 0)
    }
  }
})

// new position from mouse event
function setPosition(e) {
  var rect = canvas.value.getBoundingClientRect()
  lastKnownPos.x = e.clientX - rect.left
  lastKnownPos.y = e.clientY - rect.top
}

function resize() {
  const rect = canvas.value.getBoundingClientRect()
  ctx.value.canvas.width = rect.width
  ctx.value.canvas.height = rect.height
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return

  ctx.value.beginPath() // begin

  ctx.value.lineWidth = 5
  ctx.value.lineCap = "round"
  ctx.value.strokeStyle = props.strokeColor

  ctx.value.moveTo(lastKnownPos.x, lastKnownPos.y) // from
  setPosition(e)
  ctx.value.lineTo(lastKnownPos.x, lastKnownPos.y) // to

  ctx.value.stroke() // draw it!
}

const setPositionThenDraw = (e) => {
  setPosition(e)
  draw(e)
}

const onClearCanvas = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

const onResetCanvas = () => {
  onClearCanvas()
  if (originalDataUrl.value) {
    const img = new Image()
    img.src = originalDataUrl.value
    img.onload = () => {
      ctx.value.drawImage(img, 0, 0)
    }
  }
}

const isSaveInProgress = ref(false)
const onSaveCanvas = async () => {
  if (!isSaveInProgress.value) {
    isSaveInProgress.value = true
    const dataURL = canvas.value.toDataURL()
    await saveDentalChart(props.patientUid, dataURL)
    originalDataUrl.value = dataURL
    isSaveInProgress.value = false
  }
}
</script>

<template>
  <div class="w-[48rem] mx-auto">
    <div class="flex justify-between mb-1">
      <div class="flex gap-2">
        <button
          type="button"
          class="bg-gray-300 text-stone-700 px-2 py-0.5 rounded-lg border border-stone-700 active:text-gray-400"
          @click="onClearCanvas()"
        >
          Clear
        </button>
        <button
          type="button"
          class="bg-gray-300 text-stone-700 px-2 py-0.5 rounded-lg border border-stone-700 active:text-gray-400"
          @click="onResetCanvas()"
        >
          Reset
        </button>
      </div>
      <div>
        <button
          type="button"
          class="bg-gray-300 text-stone-700 px-2 py-0.5 rounded-lg border border-stone-700 active:text-gray-400"
          :class="{
            'text-white-400': isSaveInProgress,
          }"
          @click="onSaveCanvas()"
        >
          Save
        </button>
      </div>
    </div>
    <canvas
      @resize="resize"
      @mousemove="draw"
      @mousedown="setPositionThenDraw"
      @mouseenter="setPosition"
      ref="canvas"
      class="h-80 w-full border border-black bg-contain bg-no-repeat bg-center"
      :style="{
        backgroundImage: `url(${dentalChart})`,
      }"
    ></canvas>
  </div>
</template>
