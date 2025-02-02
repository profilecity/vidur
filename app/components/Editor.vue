<script setup lang="ts">
import {
  ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import { useVModel } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    placeholder?: string;
    id?: string;
    readOnly?: boolean;
    editorClass?: string;
  }>(),
  {
    id: 'vidur-editor',
    readOnly: false,
  }
);
const emit = defineEmits<{
  'update:modelValue': [];
}>();

const editorContent = useVModel(props, 'modelValue', emit);

const editor = shallowRef<Editor>();
onMounted(() => {
  editor.value = new Editor({
    editable: !props.readOnly,
    content: editorContent.value,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'text-sm',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'font-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'italic',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-6',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-6',
          },
        },
        heading: false,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
        levels: [1, 2, 3, 4, 5, 6],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level) ? node.attrs.level : this.options.levels[0];
          const classes = {
            1: 'text-4xl',
            2: 'text-2xl',
            3: 'text-xl',
            4: 'text-lg',
            5: 'text-md',
            6: 'text-sm',
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level as 1 | 2 | 3 | 4 | 5 | 6]}`,
            }),
            0,
          ];
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'px-2 pb-2 focus:outline-none',
      },
    },
    onUpdate(p) {
      const html = p.editor.getHTML();
      editorContent.value = html;
    },
  });
});

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return;
    const contentValue = value || '';
    const isSame = editor.value.getHTML() === value;
    if (!isSame) editor.value.commands.setContent(contentValue, false);
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
  editor.value = undefined;
});

const toggleAlignmentSingle = ref('left');
const toggleStateFontStyle = ref<string[]>([]);
const toggleListSingle = ref('');

const toggleState = ref(false);
const selectedH = ref('6');

watchEffect(() => {
  if (editor.value) {
    const editorValue = editor.value;

    toggleStateFontStyle.value = [];
    const styleChecks = ['bold', 'italic', 'strike'];
    for (let index = 0; index < styleChecks.length; index++) {
      const activeCheck = styleChecks[index] as string;
      if (editorValue.isActive(activeCheck)) {
        toggleStateFontStyle.value.push(activeCheck);
      }
    }

    toggleListSingle.value = '';
    const listChecks = ['orderedList', 'bulletList'];
    for (let index = 0; index < listChecks.length; index++) {
      const activeCheck = listChecks[index] as string;
      if (editorValue.isActive(activeCheck)) {
        toggleListSingle.value = activeCheck;
        break;
      }
    }

    toggleAlignmentSingle.value = 'left';
    const alignmentChecks = ['left', 'center', 'right', 'justify'];
    for (let index = 0; index < alignmentChecks.length; index++) {
      const activeCheck = alignmentChecks[index] as string;
      if (editorValue.isActive({ textAlign: activeCheck })) {
        toggleAlignmentSingle.value = activeCheck;
        break;
      }
    }

    selectedH.value = '6';
    const heightChecks = [1, 2, 3, 4, 5, 6];
    for (let index = 0; index < heightChecks.length; index++) {
      const activeCheck = heightChecks[index] as number;
      if (editorValue.isActive('heading', { level: activeCheck })) {
        selectedH.value = activeCheck.toString();
        break;
      }
    }
  }
});
</script>

<template>
  <section class="focus-within:ring-1 ring-zinc-400 rounded-lg border">
    <ToolbarRoot
      class="flex p-1 w-full max-w-screen !min-w-max rounded-t-lg bg-white"
      aria-label="Formatting options"
      v-if="editor && !readOnly"
    >
      <ToolbarToggleGroup v-model="toggleStateFontStyle" type="multiple" aria-label="Text formatting">
        <ToolbarToggleItem
          class="toggle-ui"
          value="bold"
          aria-label="Bold"
          @click.prevent="editor.chain().focus().toggleBold().run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:font-bold" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="italic"
          aria-label="Italic"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:font-italic" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="strike"
          aria-label="Strike through"
          @click.prevent="editor.chain().focus().toggleStrike().run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:strikethrough" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator class="w-[1px] bg-zinc-200 mx-[10px]" />
      <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger class="toggle-ui" aria-label="Customise options">
          <Icon name="proicons:text-line-height" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            class="min-w-24 outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=bottom]:animate-slideUpAndFade"
            :side-offset="5"
          >
            <DropdownMenuLabel class="text-xs text-zinc-700">Heading Size </DropdownMenuLabel>
            <DropdownMenuSeparator class="h-[1px] bg-zinc-200 m-[5px]" />
            <DropdownMenuRadioGroup v-model="selectedH">
              <DropdownMenuRadioItem
                class="rounded h-6 px-1 text-sm hover:bg-zinc-200"
                :class="selectedH == i.toString() ? 'bg-zinc-200' : ''"
                v-for="i in 6"
                :value="i.toString()"
                @click.prevent="
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: i as 1 | 2 | 3 | 4 | 5 | 6 })
                    .run()
                "
              >
                H{{ i }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
      <ToolbarSeparator class="w-[1px] bg-zinc-200 mx-[10px]" />
      <ToolbarToggleGroup v-model="toggleListSingle" type="single" aria-label="List">
        <ToolbarToggleItem
          class="toggle-ui"
          value="bulletList"
          aria-label="Bullet List"
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
        >
          <Icon class="w-[19px] h-[19px]" name="tabler:list" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="orderedList"
          aria-label="Ordered List"
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
        >
          <Icon class="w-[19px] h-[19px]" name="mingcute:list-ordered-line" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator class="w-[1px] bg-zinc-200 mx-[10px]" />
      <ToolbarToggleGroup v-model="toggleAlignmentSingle" type="single" aria-label="Text Alignment">
        <ToolbarToggleItem
          class="toggle-ui"
          value="left"
          aria-label="Left Aligned"
          @click.prevent="editor.chain().focus().setTextAlign('left').run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:text-align-left" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="center"
          aria-label="Center Aligned"
          @click.prevent="editor.chain().focus().setTextAlign('center').run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:text-align-center" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="right"
          aria-label="Right Aligned"
          @click.prevent="editor.chain().focus().setTextAlign('right').run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:text-align-right" />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          class="toggle-ui"
          value="justify"
          aria-label="Justify Aligned"
          @click.prevent="editor.chain().focus().setTextAlign('justify').run()"
        >
          <Icon class="w-[19px] h-[19px]" name="radix-icons:text-align-justify" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
    </ToolbarRoot>
    <EditorContent
      :class="{ 'rounded-b-lg bg-white p-1': !readOnly, [editorClass || '']: !!editorClass }"
      :editor
      :disabled="readOnly"
    />
  </section>
</template>

<style scoped>
.toggle-ui {
  @apply border border-transparent text-zinc-900 h-7 px-1 rounded inline-flex leading-none items-center justify-center bg-white ml-0.5 outline-none hover:border-zinc-200 first:ml-0 data-[state=on]:bg-zinc-200;
}
</style>
