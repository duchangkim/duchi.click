import Container from '@/app/_components/container';
import ScrollbarWidthSetter from '@/app/_components/use-scrollbar-width-setter';
import { MY_LINK } from '@/lib/constants';

export default function Index() {
  return (
    <main data-pagefind-body>
      <Container>
        <section className="pt-10">
          <h1 className="mb-3 text-xl font-bold">안녕하세요, 김두창입니다</h1>
          <p className="leading-7">웹 프론트엔드 개발자입니다.</p>
          <p className="leading-7">
            개발자 경험을 중요하게 생각하며 생산성을 향상시킬 수 있는 방법을 끊임없이 고민합니다.
          </p>
          <p className="leading-7">
            &quot;할 수 없다&quot;는 말을 지양하며, 항상 여러 가지 대안을 제시하는 방향으로
            협업합니다.
          </p>
        </section>
        <section className="pt-6">
          <ul className="flex gap-2">
            <li>
              <a
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={MY_LINK.GITHUB}
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={MY_LINK.NPM}
              >
                NPM
              </a>
            </li>
            <li>
              <a className="hover:underline" href={MY_LINK.EMAIL}>
                Email
              </a>
            </li>
          </ul>
        </section>
      </Container>
      <ScrollbarWidthSetter />
    </main>
  );
}
