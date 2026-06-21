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
      className={`inline-flex items-center justify-center rounded-full bg-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-black uppercase tracking-widest text-black whitespace-nowrap transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] ${className}`}
    >
      {label}
    </a>
  );
};

export default ContactButton;









