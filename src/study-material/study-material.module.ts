import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyMaterial } from "./entities/study-material.entity";
import { StudyMaterialService } from "./study-material.service";
import { StudyMaterialResolver } from "./study-material.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([StudyMaterial])],
  providers: [StudyMaterialService, StudyMaterialResolver],
})
export class StudyMaterialModule {}