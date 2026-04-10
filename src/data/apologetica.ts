export interface ApologeticaSection {
  title: string;
  content: string;
}

export interface ApologeticaGroup {
  id: string;
  name: string;
  sections: {
    ensinamentos: ApologeticaSection;
    erros: ApologeticaSection;
    baseBiblica: ApologeticaSection;
  };
}

export const SEITAS_E_DOUTRINAS: ApologeticaGroup[] = [
  {
    id: 'testemunhas-de-jeova',
    name: 'Testemunhas de Jeová',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'As Testemunhas de Jeová são conhecidas por sua ênfase no nome "Jeová" como o único nome de Deus. Eles creem que Jesus é a primeira criação de Deus (o Arcanjo Miguel) e não é coigual ao Pai. Negam a Trindade, a divindade de Cristo e a personalidade do Espírito Santo. Também ensinam que o inferno não existe (aniquilacionismo) e que apenas 144.000 pessoas irão para o céu, enquanto os demais viverão em uma terra paradisíaca.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro principal reside na negação da Deidade de Cristo e da doutrina da Trindade. Eles utilizam uma tradução própria (Tradução do Novo Mundo) que altera versículos fundamentais para apoiar suas doutrinas. Outros pontos incluem a negação da ressurreição corporal de Jesus e a crença em uma salvação baseada em obras e lealdade à organização (Torre de Vigia).',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **João 1:1**: No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus (Afirmação da divindade de Jesus).\n• **João 20:28**: Tomé chamou Jesus de "Senhor meu e Deus meu".\n• **Hebreus 1:6**: Deus ordena que todos os anjos adorem a Jesus (anjos não adorariam uma criatura).\n• **Isaías 43:11**: "Eu, eu sou o Senhor, e fora de mim não há salvador" (Jesus é o Salvador, logo Ele é o Senhor).\n• **Apocalipse 1:8**: Jesus se identifica como o Alfa e o Ômega, o Todo-Poderoso.',
      },
    },
  },
  {
    id: 'catolicismo',
    name: 'Catolicismo Romano',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Catolicismo ensina que a Igreja Romana é a única igreja verdadeira, fundada sobre Pedro. Aceitam a Bíblia, mas colocam a Tradição e o Magistério no mesmo nível de autoridade. Ensinam a veneração de Maria e santos, o dogma da Imaculada Conceição, o Purgatório, e que a salvação é obtida através da fé e dos sacramentos (batismo, penitência, etc.).',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro está em elevar a autoridade humana (Papa e Tradição) ao nível da Escritura (Sola Scriptura). A veneração de imagens e a intercessão de santos violam a exclusividade da mediação de Cristo. A doutrina do Purgatório nega a suficiência do sacrifício de Jesus na cruz, e a salvação por obras/sacramentos contraria a graça soberana.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **1 Timóteo 2:5**: "Pois há um só Deus e um só Mediador entre Deus e os homens, Cristo Jesus, homem."\n• **Efésios 2:8-9**: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus; não vem das obras, para que ninguém se glorie."\n• **Êxodo 20:4-5**: Proibição de fazer e adorar imagens de escultura.\n• **Mateus 23:9**: "A ninguém sobre a terra chamais vosso pai; porque um só é o vosso Pai, aquele que está nos céus."',
      },
    },
  },
  {
    id: 'adventistas',
    name: 'Adventistas do 7º Dia',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Os Adventistas guardam o Sábado (Sabbath) como o selo de Deus e condição para a salvação no fim dos tempos. Seguem rigorosamente as leis alimentares do Antigo Testamento. Consideram os escritos de Ellen G. White como autoridade profética inspirada. Creem no "Juízo Investigativo" (iniciado em 1844) e no sono da alma após a morte.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O legalismo em torno da guarda do Sábado como requisito de salvação é um erro grave que atenta contra a liberdade em Cristo. A doutrina do Juízo Investigativo sugere que o sacrifício de Cristo não foi completo na cruz. A elevação de Ellen G. White como autoridade profética infalível fere a suficiência da Bíblia.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Colossenses 2:16-17**: "Ninguém, pois, vos julgue pelo comer, ou pelo beber, ou por causa de dias de festa, ou de lua nova, ou de sábados... são sombras das coisas vindouras; mas o corpo é de Cristo."\n• **Gálatas 5:4**: "Destaquei-vos de Cristo, vós os que procurais justificar-vos pela lei; da graça decaístes."\n• **Romanos 14:5**: "Um faz diferença entre dia e dia, mas outro julga iguais todos os dias. Cada um esteja inteiramente convicto em sua própria mente."',
      },
    },
  },
  {
    id: 'mormonismo',
    name: 'Mormonismo (SUD)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Os Mórmons creem que Joseph Smith restaurou a verdadeira igreja através do Livro de Mórmon. Ensinam que Deus (Aba) já foi um homem e que os homens podem se tornar deuses. Creem em vários deuses para diferentes mundos. Jesus e Lúcifer seriam irmãos espirituais. Ensinam o batismo pelos mortos e o casamento eterno.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'É um sistema abertamente politeísta escondido sob terminologia cristã. Negam a natureza imutável de Deus. Adicionam o Livro de Mórmon, Doutrina e Convênios e a Pérola de Grande Valor como superiores à Bíblia. A visão de Jesus como uma criação e irmão de Satanás é uma blasfêmia herética.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Isaías 43:10**: "...antes de mim deus nenhum se formou, e depois de mim nenhum haverá."\n• **Salmo 90:2**: "De eternidade a eternidade, tu és Deus." (Deus nunca foi homem).\n• **Gálatas 1:8**: "Mas, ainda que nós mesmos ou um anjo do céu vos anuncie outro evangelho além do que já vos tenho anunciado, seja anátema."\n• **João 1:1-3**: Tudo foi criado por Jesus, logo Ele não pode ser irmão criado de Lúcifer.',
      },
    },
  },
  {
    id: 'espiritismo',
    name: 'Espiritismo (Kardecismo)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Espiritismo baseia-se na codificação de Allan Kardec. Ensina a reencarnação progressiva como meio de evolução espiritual, a comunicação com os mortos (mediunidade) e que a caridade é o único caminho para a salvação ("Fora da caridade não há salvação"). Veem Jesus apenas como um espírito de luz e modelo moral, mas não como Deus.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro central é a negação da salvação pela fé em Cristo e a substituição desta pela auto-redenção via reencarnação. A tentativa de contactar os mortos é estritamente proibida por Deus. Negam a ressurreição, o julgamento final logo após a morte e o inferno bíblico.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Hebreus 9:27**: "E, como aos homens está ordenado morrerem uma vez, vindo depois disso o juízo." (Nega a reencarnação).\n• **Deuteronômio 18:10-12**: "Não se achará entre ti... nem quem consulte os mortos; pois todo aquele que faz tal coisa é abominação ao Senhor."\n• **Apocalipse 1:7**: "Todo olho o verá" (Sobre a volta de Jesus física, não apenas espiritual).\n• **Efésios 2:8**: Salvação é pela graça, não pela caridade ou evolução espiritual.',
      },
    },
  },
];
