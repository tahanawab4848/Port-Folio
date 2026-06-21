interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  onClick,
  className = '',
}: ContactButtonProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-white whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] ${className}`}
    >
      {label}
    </a>
  );
};

export default ContactButton;









