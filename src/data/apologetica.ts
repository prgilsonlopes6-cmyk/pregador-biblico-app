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
        content: '• **João 1:1**: No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus (Afirmação da divindade de Jesus).\n• **João 20:28**: Tomé chamou Jesus de "Senhor meu e Deus meu".\n• **Hebreus 1:6**: Deus ordena que todos os anjos adorem a Jesus (anjos não adorariam uma criatura).\n• **Isaías 43:11**: "Eu, eu sou o Senhor, e fora de mim não há salvador" (Jesus é o Salvador, logo Ele é o Senhor).',
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
        content: '• **1 Timóteo 2:5**: "Pois há um só Deus e um só Mediador entre Deus e os homens, Cristo Jesus, homem."\n• **Efésios 2:8-9**: "Porque pela graça sois salvos, por meio da fé... não vem das obras."\n• **Êxodo 20:4-5**: Proibição de fazer e adorar imagens de escultura.',
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
        content: 'O legalismo em torno da guarda do Sábado como requisito de salvação é um erro grave. A doutrina do Juízo Investigativo sugere que o sacrifício de Cristo não foi completo na cruz. A elevação de Ellen G. White como autoridade profética infalível fere a suficiência da Bíblia.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Colossenses 2:16-17**: "Ninguém, pois, vos julgue... por causa de sábados... são sombras das coisas vindouras."\n• **Gálatas 5:4**: "Destaquei-vos de Cristo, vós os que procurais justificar-vos pela lei; da graça decaístes."',
      },
    },
  },
  {
    id: 'mormonismo',
    name: 'Mormonismo (SUD)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Os Mórmons creem que Joseph Smith restaurou a verdadeira igreja através do Livro de Mórmon. Ensinam que Deus já foi um homem e que os homens podem se tornar deuses. Creem em vários deuses para diferentes mundos. Jesus e Lúcifer seriam irmãos espirituais. Ensinam o batismo pelos mortos.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'É um sistema politeísta. Negam a natureza imutável de Deus. Adicionam livros como o Livro de Mórmon como superiores à Bíblia. A visão de Jesus como uma criação e irmão de Satanás é herética.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Isaías 43:10**: "...antes de mim deus nenhum se formou, e depois de mim nenhum haverá."\n• **Salmo 90:2**: "De eternidade a eternidade, tu és Deus." (Deus nunca foi homem).',
      },
    },
  },
  {
    id: 'espiritismo',
    name: 'Espiritismo (Kardecismo)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Espiritismo ensina a reencarnação progressiva como meio de evolução espiritual, a comunicação com os mortos (mediunidade) e que a caridade é o único caminho para a salvação. Veem Jesus apenas como um espírito de luz e modelo moral, mas não como Deus.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro central é a negação da salvação pela fé em Cristo (auto-redenção). A tentativa de contactar os mortos é estritamente proibida por Deus. Negam a ressurreição física e o julgamento final após a morte.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Hebreus 9:27**: "E, como aos homens está ordenado morrerem uma vez, vindo depois disso o juízo."\n• **Deuteronômio 18:10-12**: Proibição de consultar os mortos.',
      },
    },
  },
  {
    id: 'islamismo',
    name: 'Islamismo',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Islã ensina que Alá é o único Deus e Maomé seu último profeta. O Alcorão é sua escritura sagrada. Ensinam os cinco pilares: fé, oração, caridade, jejum e peregrinação a Meca. Creem que Jesus (Isa) foi apenas um profeta e que nunca morreu na cruz, logo não houve ressurreição.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'Negam a divindade de Jesus e a Trindade. Negam o sacrifício vicário de Cristo na cruz, removendo a única base para a expiação dos pecados. A salvação é baseada no mérito e na submissão às leis de Alá, sem garantia de perdão.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **João 14:6**: "Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim."\n• **1 João 2:22-23**: "Quem é o mentiroso, senão aquele que nega que Jesus é o Cristo? Este é o anticristo, o que nega o Pai e o Filho."',
      },
    },
  },
  {
    id: 'maconaria',
    name: 'Maçonaria',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Embora se autodenomine uma sociedade filosófica e filantrópica, a Maçonaria possui rituais e ensinos religiosos. Fala do "Grande Arquiteto do Universo" (GADU) como uma divindade genérica que aceita todas as religiões. Ensina que o homem pode ser aperfeiçoado por meio de suas próprias obras e rituais iniciáticos.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro é o sincretismo religioso (colocar Jesus no mesmo nível de Buda ou Maomé). A crença em uma "salvação" pelo aperfeiçoamento humano e obras iniciáticas nega a necessidade de novo nascimento e da graça de Cristo. O juramento de segredo e rituais de juramento violam princípios bíblicos.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **2 Coríntios 6:14**: "Não vos ponhais em jugo desigual com os incrédulos."\n• **Atos 4:12**: "E em nenhum outro há salvação, porque também debaixo do céu nenhum outro nome há, dado entre os homens, pelo qual devamos ser salvos."',
      },
    },
  },
  {
    id: 'budismo',
    name: 'Budismo',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Budismo busca o fim do sofrimento por meio da iluminação e da eliminação do desejo. Ensina o ciclo de reencarnações (Samsara) e o Karma. O objetivo final é o Nirvana, um estado de extinção do "eu" e fusão com o cosmos. Fundamentalmente, muitas vertentes são ateístas ou agnósticas em relação a um Deus pessoal.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'Negam a existência de um Criador pessoal e a natureza do pecado contra esse Deus. A auto-redenção por meio de meditação e esforço próprio descarta o sacrifício de Cristo. A visão de extinção do ser (Nirvana) contraria a promessa bíblica de vida eterna consciente na presença de Deus.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Gênesis 1:1**: "No princípio criou Deus os céus e a terra." (Deus é pessoal e Criador).\n• **João 3:16**: "Para que todo aquele que nele crê não pereça, mas tenha a vida eterna." (Vida consciente, não extinção).',
      },
    },
  },
  {
    id: 'hinduismo',
    name: 'Hinduísmo',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Hinduísmo é um sistema complexo que ensina o Panteísmo (tudo é deus). Creem no Brahman como a realidade última e in pessoal. Ensinam a reencarnação, o Karma e a adoração a milhões de divindades (avatares). Buscam o Moksha, a libertação do ciclo de renascimentos.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro principal é o Panteísmo e o Politeísmo. Ao dizer que "tudo é deus", apagam a distinção entre Criador e criatura. A reencarnação nega a unicidade da vida humana e do juízo divino. Negam a necessidade de um Salvador externo, buscando a divindade dentro de si mesmos.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Isaías 44:6**: "Eu sou o primeiro, e eu sou o último, e fora de mim não há Deus."\n• **Hebreus 9:27**: "Ao homem está ordenado morrer uma vez."',
      },
    },
  },
  {
    id: 'religioes-afro',
    name: 'Umbanda e Candomblé',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Estas são religiões afro-brasileiras que envolvem o culto a Orixás, guias espirituais e entidades. A Umbanda é mais sincrética, misturando catolicismo e espiritismo. O foco é a caridade, a manipulação de energias e a consulta a "espíritos" incorporados para orientação e ajuda.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'A Bíblia identifica a invocação de espíritos e o culto a entidades como espiritismo e idolatria. O sincretismo cria uma falsa imagem de Deus e de Cristo. A dependência de guias e orixás substitui a dependência total do Espírito Santo e a glória de Jesus.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **1 Coríntios 10:20**: "As coisas que os gentios sacrificam, as sacrificam aos demônios, e não a Deus."\n• **Levítico 19:31**: "Não vos virareis para os adivinhadores e encantadores; não os busqueis, contaminando-vos com eles."',
      },
    },
  },
  {
    id: 'seicho-no-ie',
    name: 'Seicho-no-ie',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Uma filosofia religiosa japonesa que ensina que o mal, a doença e o pecado não existem, sendo apenas ilusões da mente. Dizem que todos são "filhos de Deus" em um sentido panteísta e que o pensamento positivo cria a realidade. Usam terminologia bíblica de forma distorcida.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'Negar a realidade do pecado é negar a necessidade do Evangelho e de um Salvador. Transforma Deus em uma "lei mental" impessoal. Ensina a auto-divinização do homem por meio da percepção mental, o que é a essência da queda no Éden ("sereis como deuses").',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **1 João 1:8**: "Se dissermos que não temos pecado, enganamo-nos a nós mesmos, e não há verdade em nós."\n• **Romanos 3:23**: "Porque todos pecaram e destituídos estão da glória de Deus."',
      },
    },
  },
  {
    id: 'judaismo',
    name: 'Judaísmo (Perspectiva Messiânica)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Judaísmo tradicional aceita apenas o Antigo Testamento (Tanakh) e rejeita Jesus como o Messias prometido. Focam na guarda da Lei (Torá), nas tradições dos anciãos (Talmud) e na espera de um Messias político e humano. Muitos veem Jesus apenas como um professor ou um reformador radical.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro é a rejeição de Yeshua (Jesus) como o cumprimento das profecias messiânicas. Ao buscar a justiça pela observância da Lei, ignoram que a Lei servia como "aio" para nos levar a Cristo. A negação do Novo Testamento os mantém sob a antiga aliança.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Isaías 53**: Profecia sobre o Messias sofredor cumprida em Jesus.\n• **Romanos 10:4**: "Porque o fim da lei é Cristo para justiça de todo aquele que crê."\n• **Gálatas 3:24**: "De maneira que a lei nos serviu de aio, para nos conduzir a Cristo."',
      },
    },
  },
  {
    id: 'ateismo',
    name: 'Ateísmo e Humanismo',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'O Ateísmo afirma que Deus não existe. O Humanismo Secular coloca o homem como o centro de todas as coisas e a razão humana como a autoridade suprema. Creem que o universo e a vida são frutos do acaso e da evolução naturalista, sem propósito transcendente.',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'É um erro de supressão da verdade evidente na criação. Sem Deus, não há base objetiva para a moralidade, a dignidade humana ou o sentido da vida. A confiança cega na razão humana finita ignora a queda e a cegueira espiritual do homem.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Salmo 14:1**: "Disse o néscio no seu coração: Não há Deus."\n• **Romanos 1:20**: "Porque as suas coisas invisíveis... se entendem, e claramente se veem pelas coisas que estão criadas, para que eles fiquem inescusáveis."',
      },
    },
  },
  {
    id: 'nova-era',
    name: 'Nova Era (Gnosticismo Moderno)',
    sections: {
      ensinamentos: {
        title: '📌 1. O que eles ensinam',
        content: 'Um movimento difuso que mistura ocultismo, misticismo oriental e psicologia. Ensinam que "tudo é um" (monismo) e "tudo é deus" (panteísmo). Promovem cristais, canalização, astrologia e o "cristo cósmico" (um princípio espiritual que estaria em todos).',
      },
      erros: {
        title: '📌 2. Onde está o erro',
        content: 'O erro é a divinização do homem e a descaracterização de Jesus como o Salvador único e histórico. Promovem o contato com espíritos (demônios disfarçados de guias). Rejeitam a verdade absoluta em favor de uma espiritualidade subjetiva e egocêntrica.',
      },
      baseBiblica: {
        title: '📌 3. Base bíblica',
        content: '• **Colossenses 2:8**: "Tende cuidado, para que ninguém vos faça presa sua, por meio de filosofias e vãs sutilezas."\n• **1 Timóteo 4:1**: "Nos últimos tempos alguns apostatarão da fé, dando ouvidos a espíritos enganadores."',
      },
    },
  },
];
