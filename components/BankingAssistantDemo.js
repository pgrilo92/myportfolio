'use client';
import { useState } from 'react';

const responses = {
  pt: {
    'como abrir conta': 'Para abrir uma conta connosco, precisa de:\n\n1. Documento de identificação válido (BI ou Passaporte)\n2. Comprovativo de residência\n3. Número de contribuinte\n4. Depósito mínimo inicial de 10.000 Kz\n\nPode iniciar o processo online ou visitar qualquer agência. O processo demora cerca de 24 horas.',
    'taxas': 'As nossas taxas principais são:\n\n• Transferências nacionais: 500 Kz\n• Transferências internacionais: 2% do valor (mín. 2.000 Kz)\n• Levantamentos ATM: Grátis nas nossas máquinas\n• Manutenção de conta: 1.500 Kz/mês',
    'horário': 'Horário de atendimento:\n\n• Segunda a Sexta: 8h00 - 16h00\n• Sábado: 8h00 - 12h00\n• Domingo: Encerrado\n\nO atendimento online está disponível 24/7.',
    'cartão': 'Oferecemos vários tipos de cartões:\n\n• Cartão de Débito: Grátis com a conta\n• Cartão de Crédito: A partir de 15.000 Kz/ano\n• Cartão Empresarial: Consulte-nos\n\nTodos os cartões são aceites internacionalmente.',
    'default': 'Obrigado pela sua pergunta! Para informações detalhadas, por favor contacte:\n\n📧 Email: patrickgrillo11@gmail.com\n\nComo posso ajudar com mais alguma questão sobre os nossos serviços?',
  },
  fr: {
    'comment ouvrir compte': 'Pour ouvrir un compte chez nous, vous avez besoin de:\n\n1. Pièce d\'identité valide\n2. Justificatif de domicile\n3. Numéro fiscal\n4. Dépôt minimum initial de 10.000 Kz\n\nVous pouvez commencer en ligne ou visiter une agence. Le processus prend environ 24 heures.',
    'frais': 'Nos principaux frais:\n\n• Virements nationaux: 500 Kz\n• Virements internationaux: 2% du montant (min. 2.000 Kz)\n• Retraits DAB: Gratuit sur nos machines\n• Tenue de compte: 1.500 Kz/mois',
    'horaire': 'Heures d\'ouverture:\n\n• Lundi à Vendredi: 8h00 - 16h00\n• Samedi: 8h00 - 12h00\n• Dimanche: Fermé\n\nLe service en ligne est disponible 24h/24.',
    'carte': 'Nous proposons plusieurs types de cartes:\n\n• Carte de Débit: Gratuite avec le compte\n• Carte de Crédit: À partir de 15.000 Kz/an\n• Carte Entreprise: Consultez-nous\n\nToutes les cartes sont acceptées internationalement.',
    'default': 'Merci pour votre question! Pour des informations détaillées, veuillez contacter:\n\n📧 Email: patrickgrillo11@gmail.com\n\nComment puis-je vous aider avec d\'autres questions sur nos services?',
  },
  en: {
    'how open account': 'To open an account with us, you need:\n\n1. Valid ID (ID card or Passport)\n2. Proof of address\n3. Tax number\n4. Minimum initial deposit of 10,000 Kz\n\nYou can start online or visit any branch. The process takes about 24 hours.',
    'fees': 'Our main fees:\n\n• Domestic transfers: 500 Kz\n• International transfers: 2% of amount (min. 2,000 Kz)\n• ATM withdrawals: Free at our machines\n• Account maintenance: 1,500 Kz/month',
    'hours': 'Business hours:\n\n• Monday to Friday: 8:00 AM - 4:00 PM\n• Saturday: 8:00 AM - 12:00 PM\n• Sunday: Closed\n\nOnline service is available 24/7.',
    'card': 'We offer several card types:\n\n• Debit Card: Free with account\n• Credit Card: From 15,000 Kz/year\n• Business Card: Contact us\n\nAll cards are accepted internationally.',
    'default': 'Thank you for your question! For detailed information, please contact:\n\n📧 Email: patrickgrillo11@gmail.com\n\nHow can I help with other questions about our services?',
  },
};

export default function BankingAssistantDemo({ lang, t }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  
  const getResponse = (question) => {
    const q = question.toLowerCase();
    const langResponses = responses[lang] || responses.en;
    
    for (const [key, response] of Object.entries(langResponses)) {
      if (key !== 'default' && q.includes(key)) {
        return response;
      }
    }
    return langResponses.default;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsThinking(true);
    
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant',
        content: getResponse(input),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1000 + Math.random() * 1000);
  };
  
  return (
    <div className="banking-demo">
      <div className="demo-header">
        <h3>{t.demo.title}</h3>
        <p className="demo-subtitle">{t.demo.subtitle}</p>
      </div>
      
      <div className="demo-messages">
        {messages.length === 0 && (
          <div className="demo-welcome">
            <p>{t.demo.examples}</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`demo-message ${msg.role}`}>
            <div className="message-content">
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="demo-message assistant thinking">
            <div className="message-content">{t.demo.thinking}</div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="demo-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.demo.placeholder}
          className="demo-input"
        />
        <button type="submit" className="demo-submit">
          {t.demo.send}
        </button>
      </form>
    </div>
  );
}
