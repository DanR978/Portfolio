import { ClipboardList, PencilRuler, Hammer, CheckCircle2 } from 'lucide-react';

const process = [
  {
    id: 1,
    title: 'Consultation',
    description:
      'We meet on-site or in our showroom to understand your vision, measure your space, and recommend the right stone for the way you live.',
    icon: ClipboardList,
  },
  {
    id: 2,
    title: 'Design',
    description:
      'Templates, slab selection, and edge profiles — every detail is reviewed and approved before a single cut is made.',
    icon: PencilRuler,
  },
  {
    id: 3,
    title: 'Fabrication',
    description:
      'In our shop, your slabs are precision-cut, polished, and finished by craftsmen who treat each piece as one of one.',
    icon: Hammer,
  },
  {
    id: 4,
    title: 'Installation',
    description:
      'Clean, careful, on-time installation — sealed, inspected, and walked through with you before we leave.',
    icon: CheckCircle2,
  },
];

export default process;
